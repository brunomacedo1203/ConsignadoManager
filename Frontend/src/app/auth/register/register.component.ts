import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { Cargo } from '../../shared/enums/cargo.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterLink
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  cargos = Object.values(Cargo);
  errorMessage: string = '';
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmacaoSenha: ['', [Validators.required]],
      cargo: [null, [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('senha')?.value === g.get('confirmacaoSenha')?.value
      ? null
      : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      console.log('Enviando dados:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro no registro:', error);
          if (error.error?.errors) {
            const errors = error.error.errors;
            const errorMessages = [];
            for (const key in errors) {
              errorMessages.push(errors[key][0]);
            }
            this.errorMessage = errorMessages.join(' ');
          } else {
            this.errorMessage = 'Erro ao registrar usuário. Por favor, tente novamente.';
          }
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
