import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ClienteService, ServiceResponse, Cliente } from '../cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  tiposEmprestimo = ['INSS', 'ServidorPublico', 'Militar', 'Privado'];
  statusEmprestimo = ['EmAnalise', 'Aprovado', 'Reprovado', 'Liquidado', 'Inadimplente'];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private location: Location
  ) {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tipoEmprestimo: ['', [Validators.required]],
      statusEmprestimo: ['', [Validators.required]],
      valorEmprestimo: ['', [Validators.required, Validators.min(0)]],
      qtdParcelas: ['', [Validators.required, Validators.min(1)]],
      valorParcela: ['', [Validators.required, Validators.min(0)]],
      dataContratacao: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      console.log('Formulário válido, dados:', this.clienteForm.value);

      // Formata a data antes de enviar
      const formData = {
        ...this.clienteForm.value,
        dataContratacao: new Date(this.clienteForm.value.dataContratacao).toISOString()
      };

      console.log('Dados formatados para envio:', formData);

      this.clienteService.createCliente(formData).subscribe({
        next: (response: ServiceResponse<Cliente[]>) => {
          console.log('Resposta do servidor:', response);
          if (response && response.sucesso) {
            console.log('Cliente criado com sucesso');
            this.router.navigate(['/clientes']);
          } else {
            console.error('Erro na resposta do servidor:', response?.mensagem);
          }
        },
        error: (error: unknown) => {
          console.error('Erro ao criar cliente:', error);
          if (error instanceof Error) {
            console.error('Detalhes do erro:', error.message);
          }
        }
      });
    } else {
      console.log('Formulário inválido:', this.clienteForm.errors);
      Object.keys(this.clienteForm.controls).forEach(key => {
        const control = this.clienteForm.get(key);
        if (control?.errors) {
          console.log(`Erros no campo ${key}:`, control.errors);
        }
      });
    }
  }

  voltar(): void {
    this.location.back();
  }
}
