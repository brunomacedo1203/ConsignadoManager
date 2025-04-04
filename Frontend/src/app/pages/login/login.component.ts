import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';

      const credentials: LoginCredentials = {
        email: this.form.get('email')?.value,
        senha: this.form.get('senha')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.status) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = response.mensagem || 'Erro ao fazer login';
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Erro ao fazer login:', error);
          this.error = error.message || 'Erro ao fazer login. Por favor, tente novamente.';
          this.loading = false;
        }
      });
    }
  }
}
