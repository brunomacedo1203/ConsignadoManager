import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../cliente.service';
import { ClienteDetalhesComponent } from '../cliente-detalhes/cliente-detalhes.component';

interface ApiResponse<T> {
  dados: T;
  mensagem: string;
  sucesso: boolean;
}

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  ativo: boolean;
}

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ClienteListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'ativo', 'acoes'];
  dataSource: MatTableDataSource<Cliente>;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Cliente>([]);
  }

  ngOnInit() {
    this.carregarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  carregarClientes() {
    this.isLoading = true;
    this.clienteService.listarClientes().subscribe({
      next: (response: ApiResponse<Cliente[]>) => {
        console.log('Clientes carregados:', response);
        if (response && response.dados) {
          this.dataSource.data = response.dados;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.isLoading = false;
      }
    });
  }

  verDetalhes(cliente: Cliente) {
    this.dialog.open(ClienteDetalhesComponent, {
      width: '600px',
      data: cliente
    });
  }
}
