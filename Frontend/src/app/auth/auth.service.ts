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

  login(email: string, senha: string): Observable<any> {
    const url = `${environment.apiUrl}/Login`;
    console.log('URL:', url);
    console.log('Headers:', new HttpHeaders().set('Content-Type', 'application/json'));
    console.log('Body:', { email, senha });

    return this.http.post<any>(url, { email, senha }).pipe(
      map(response => {
        const token = response.dados;
        const user = {
          token: token,
          email: email
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
    console.log('URL:', url);
    console.log('Headers:', new HttpHeaders().set('Content-Type', 'application/json'));
    console.log('Body:', data);

    const registerData = {
      nome: data.nome,
      usuario: data.usuario,
      email: data.email,
      senha: data.senha,
      cargo: data.cargo
    };

    return this.http.post<any>(url, registerData).pipe(
      map(response => {
        const token = response.dados;
        const user = {
          token: token,
          email: data.email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
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
