import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      cargo: ['ANALISTA', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(g: FormGroup) {
    return g.get('senha')?.value === g.get('confirmarSenha')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';

      const user: RegisterUser = {
        nome: this.form.get('nome')?.value,
        email: this.form.get('email')?.value,
        senha: this.form.get('senha')?.value,
        cargo: this.form.get('cargo')?.value
      };

      this.authService.register(user).subscribe({
        next: (response) => {
          if (response.status) {
            this.router.navigate(['/login']);
          } else {
            this.error = response.mensagem || 'Erro ao cadastrar usuário';
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
          this.error = error.message || 'Erro ao cadastrar usuário. Por favor, tente novamente.';
          this.loading = false;
        }
      });
    }
  }
}
