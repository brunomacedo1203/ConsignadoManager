import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  ativo: boolean;
  tipoEmprestimo: string;
  statusEmprestimo: string;
  valorEmprestimo: number;
  qtdParcelas: number;
  valorParcela: number;
  dataContratacao: Date;
}

export interface ServiceResponse<T> {
  dados?: T;
  mensagem: string;
  sucesso: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/Cliente`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<ServiceResponse<Cliente[]>> {
    return this.http.get<ServiceResponse<Cliente[]>>(this.apiUrl);
  }

  getClienteById(id: number): Observable<ServiceResponse<Cliente>> {
    return this.http.get<ServiceResponse<Cliente>>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Omit<Cliente, 'id' | 'ativo'>): Observable<ServiceResponse<Cliente[]>> {
    const dataContratacao = (cliente.dataContratacao instanceof Date)
      ? cliente.dataContratacao.toISOString()
      : new Date(cliente.dataContratacao).toISOString();

    const clienteData = {
      ...cliente,
      valorEmprestimo: Number(cliente.valorEmprestimo),
      qtdParcelas: Number(cliente.qtdParcelas),
      valorParcela: Number(cliente.valorParcela),
      dataContratacao
    };

    return this.http.post<ServiceResponse<Cliente[]>>(this.apiUrl, clienteData);
  }

  updateCliente(cliente: Cliente): Observable<ServiceResponse<Cliente[]>> {
    const clienteData = {
      ...cliente,
      valorEmprestimo: Number(cliente.valorEmprestimo),
      qtdParcelas: Number(cliente.qtdParcelas),
      valorParcela: Number(cliente.valorParcela),
      dataContratacao: typeof cliente.dataContratacao === 'string'
        ? cliente.dataContratacao
        : new Date(cliente.dataContratacao).toISOString()
    };

    return this.http.put<ServiceResponse<Cliente[]>>(this.apiUrl, clienteData);
  }

  inativarCliente(id: number): Observable<ServiceResponse<Cliente[]>> {
    return this.http.put<ServiceResponse<Cliente[]>>(`${this.apiUrl}/inativaCliente?id=${id}`, {});
  }

  excluirCliente(id: number): Observable<ServiceResponse<Cliente[]>> {
    return this.http.delete<ServiceResponse<Cliente[]>>(`${this.apiUrl}?id=${id}`);
  }

  exportarExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/exportar-excel`, {
      responseType: 'blob'
    });
  }
}
