import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) { }

  listarClientes(): Observable<ApiResponse<Cliente[]>> {
    return this.http.get<ApiResponse<Cliente[]>>(`${environment.apiUrlBase}/Cliente`);
  }

  obterCliente(id: number): Observable<ApiResponse<Cliente>> {
    return this.http.get<ApiResponse<Cliente>>(`${environment.apiUrlBase}/Cliente/${id}`);
  }
}
