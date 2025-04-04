import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginCredentials, RegisterUser, AuthResponse, User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.loadCurrentUser();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = this.decodeToken(token);
        const user: User = {
          id: decodedToken.id,
          nome: decodedToken.nome,
          email: decodedToken.email,
          cargo: decodedToken.cargo,
          token: token
        };
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        this.logout();
      }
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.status && response.dados) {
            const user: User = {
              id: response.dados.usuario.id,
              nome: response.dados.usuario.nome,
              email: response.dados.usuario.email,
              cargo: response.dados.usuario.cargo,
              token: response.dados.token
            };
            localStorage.setItem('token', response.dados.token);
            this.currentUserSubject.next(user);
          }
        })
      );
  }

  register(user: RegisterUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.cargo === 'ADMIN';
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }
}
