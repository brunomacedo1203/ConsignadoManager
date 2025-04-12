import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }

  login(email: string, senha: string): Observable<any> {
    const url = `${environment.apiUrl}/Auth/Login`;

    return this.http.post<any>(url, { email, senha }).pipe(
      map(response => {
        const token = response.dados;
        const decodedToken = this.decodeJwt(token);

        const user = {
          token: token,
          email: decodedToken.Email,
          usuario: decodedToken.Username,
          cargo: decodedToken.Cargo
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(error => this.handleError(error))
    );
  }

  register(data: any): Observable<any> {
    const url = `${environment.apiUrl}/Auth/Register`;

    const registerData = {
      usuario: data.usuario,
      email: data.email,
      senha: data.senha,
      confirmacaoSenha: data.confirmacaoSenha,
      cargo: data.cargo
    };

    return this.http.post<any>(url, registerData).pipe(
      map(response => {
        return response;
      }),
      catchError(error => this.handleError(error))
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro:', error);
    return throwError(() => error);
  }
}
