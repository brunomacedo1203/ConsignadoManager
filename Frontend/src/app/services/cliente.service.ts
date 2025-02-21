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

  private apiUrl =`${environment.apiUrl}/cliente`

  constructor(private http:HttpClient) { }

  GetClientes():Observable<Response<Cliente[]>>
  {
    return this.http.get<Response<Cliente[]>>(this.apiUrl);
  }

}
