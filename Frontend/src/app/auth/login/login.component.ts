import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    // Se o usuário já estiver logado, redireciona para a página inicial
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = {
      email: this.loginForm.get('email')?.value,
      senha: this.loginForm.get('senha')?.value
    };
    console.log('Enviando dados:', loginData);

    this.authService.login(loginData.email, loginData.senha).subscribe({
      next: (response) => {
        console.log('Sucesso:', response);
        // Redireciona para o dashboard após login bem-sucedido
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erro completo:', error);
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Email ou senha inválidos';
        } else {
          this.errorMessage = `Erro ao fazer login: ${error.message || error.statusText || 'Erro desconhecido'}`;
        }
      },
      complete: () => {
        console.log('Requisição completada');
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
