import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../models/Cliente';
import { Response } from '../../models/Response';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ListaClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  loading = false;
  error = '';
  isAdmin = false;

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    this.error = '';
    this.clientes = [];

    console.log('Iniciando carregamento de clientes...');
    this.clienteService.GetClientes().subscribe({
      next: (response: Response<Cliente[]>) => {
        console.log('Resposta recebida:', response);
        if (response.status && response.dados) {
          this.clientes = response.dados;
          console.log('Clientes carregados:', this.clientes);
        } else {
          this.error = response.mensagem || 'Erro ao carregar clientes';
          console.error('Erro na resposta:', this.error);
        }
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Erro ao carregar clientes:', error);
        this.error = error.message || 'Erro ao carregar clientes. Por favor, tente novamente.';
        this.loading = false;
      }
    });
  }

  deleteCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.DeleteCliente(id).subscribe({
        next: (response: Response<void>) => {
          if (response.status) {
            this.clientes = this.clientes.filter(cliente => cliente.id !== id);
          } else {
            this.error = response.mensagem || 'Erro ao excluir cliente';
          }
        },
        error: (error: Error) => {
          console.error('Erro ao excluir cliente:', error);
          this.error = error.message || 'Erro ao excluir cliente. Por favor, tente novamente.';
        }
      });
    }
  }

  editCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  addCliente(): void {
    this.router.navigate(['/clientes/novo']);
  }
}
