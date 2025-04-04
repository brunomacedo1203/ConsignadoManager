import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { Response } from '../../models/Response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ClienteFormComponent implements OnInit {
  @Input() cliente?: Cliente;
  @Output() salvo = new EventEmitter<Cliente>();
  @Output() cancelado = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    if (this.cliente) {
      this.form.patchValue(this.cliente);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';

      const cliente: Cliente = {
        ...this.form.value,
        id: this.cliente?.id
      };

      if (cliente.id) {
        this.clienteService.UpdateCliente(cliente).subscribe({
          next: (response: Response<Cliente>) => {
            if (response.status && response.dados) {
              this.salvo.emit(response.dados);
            } else {
              this.error = response.mensagem || 'Erro ao atualizar cliente';
              this.loading = false;
            }
          },
          error: (error: Error) => {
            console.error('Erro ao atualizar cliente:', error);
            this.error = error.message || 'Erro ao atualizar cliente. Por favor, tente novamente.';
            this.loading = false;
          }
        });
      } else {
        this.clienteService.CreateCliente(cliente).subscribe({
          next: (response: Response<Cliente>) => {
            if (response.status && response.dados) {
              this.salvo.emit(response.dados);
            } else {
              this.error = response.mensagem || 'Erro ao criar cliente';
              this.loading = false;
            }
          },
          error: (error: Error) => {
            console.error('Erro ao criar cliente:', error);
            this.error = error.message || 'Erro ao criar cliente. Por favor, tente novamente.';
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.cancelado.emit();
  }
}
