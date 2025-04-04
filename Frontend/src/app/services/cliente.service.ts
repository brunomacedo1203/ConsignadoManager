import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response';
import { Cliente } from '../models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl =`${environment.apiUrl}/clientes`

  constructor(private http:HttpClient) { }

  GetClientes():Observable<Response<Cliente[]>>
  {
    return this.http.get<Response<Cliente[]>>(this.apiUrl);
  }

  GetClienteById(id: number): Observable<Response<Cliente>> {
    return this.http.get<Response<Cliente>>(`${this.apiUrl}/${id}`);
  }

  CreateCliente(cliente:Cliente):Observable<Response<Cliente>>{
    console.log('URL da API:', this.apiUrl);
    return this.http.post<Response<Cliente>>(this.apiUrl, cliente);
  }

  UpdateCliente(cliente: Cliente): Observable<Response<Cliente>> {
    return this.http.put<Response<Cliente>>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  DeleteCliente(id: number): Observable<Response<void>> {
    return this.http.delete<Response<void>>(`${this.apiUrl}/${id}`);
  }

}
