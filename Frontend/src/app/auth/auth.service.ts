import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro na requisição:', error);
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      console.error('Erro do cliente:', error.error.message);
      return throwError(() => new Error(error.error.message));
    } else {
      // Erro do backend
      console.error(
        `Backend retornou código ${error.status}, ` +
        `corpo: ${JSON.stringify(error.error)}`);
      return throwError(() => error);
    }
  }

  login(email: string, senha: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ email, senha });
    
    console.log('URL:', `${environment.apiUrl}/Login`);
    console.log('Headers:', headers);
    console.log('Body:', body);

    return this.http.post<any>(
      `${environment.apiUrl}/Login`, 
      body,
      { headers: headers }
    ).pipe(
      map(response => {
        console.log('Resposta do login:', response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: any) {
    const registerData = {
      nome: user.nome,
      usuario: user.usuario,
      email: user.email,
      senha: user.senha,
      confirmacaoSenha: user.confirmacaoSenha
    };
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(registerData);

    console.log('URL:', `${environment.apiUrl}/Register`);
    console.log('Headers:', headers);
    console.log('Body:', body);

    return this.http.post(
      `${environment.apiUrl}/Register`, 
      body,
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
