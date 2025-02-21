import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesGeral: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.GetClientes().subscribe((data) => {
      const dados = data.dados;

      const dadosClientes = dados.map((item) => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString(
          'pt-BR'
        );
        item.dataDeAlteracao = new Date(
          item.dataDeAlteracao!
        ).toLocaleDateString('pt-BR');
        return item;
      });

      this.clientes = dadosClientes;
      console.log('Clientes carregados:', this.clientes);
      this.clientesGeral = dados;
    });
  }
  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.clientes = this.clientesGeral.filter((cliente) => {
      return cliente.nome.toLowerCase().includes(value);
    });
  }
}
