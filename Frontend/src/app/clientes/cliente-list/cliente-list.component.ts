import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClienteService } from '../cliente.service';
import { ClienteDetalhesComponent } from '../cliente-detalhes/cliente-detalhes.component';

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
    MatTooltipModule
  ]
})
export class ClienteListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'ativo', 'acoes'];
  dataSource: any[] = [];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.carregarClientes();
  }

  ngAfterViewInit() {
    if (this.table) {
      this.table.dataSource = this.dataSource;
    }
  }

  carregarClientes() {
    this.isLoading = true;
    this.clienteService.listarClientes().subscribe({
      next: (clientes) => {
        console.log('Clientes carregados:', clientes);
        this.dataSource = clientes;
        if (this.table) {
          this.table.dataSource = this.dataSource;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.isLoading = false;
      }
    });
  }

  verDetalhes(cliente: any) {
    this.dialog.open(ClienteDetalhesComponent, {
      width: '600px',
      data: cliente
    });
  }
}
