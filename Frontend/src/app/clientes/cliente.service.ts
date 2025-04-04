import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) { }

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Cliente`);
  }

  obterCliente(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Cliente/${id}`);
  }
}
