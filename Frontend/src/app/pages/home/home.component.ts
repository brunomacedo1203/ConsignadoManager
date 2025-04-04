import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Response } from '../../models/Response';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesGeral: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.GetClientes().subscribe((response: Response<Cliente[]>) => {
      if (response.status && response.dados) {
        const dadosClientes = response.dados.map((item) => {
          if (item.dataDeCriacao) {
            item.dataDeCriacao = new Date(item.dataDeCriacao).toLocaleDateString('pt-BR');
          }
          if (item.dataDeAlteracao) {
            item.dataDeAlteracao = new Date(item.dataDeAlteracao).toLocaleDateString('pt-BR');
          }
          return item;
        });

        this.clientes = dadosClientes;
        this.clientesGeral = response.dados;
      }
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.clientes = this.clientesGeral.filter((cliente) => {
      return cliente.nome.toLowerCase().includes(value);
    });
  }
}
