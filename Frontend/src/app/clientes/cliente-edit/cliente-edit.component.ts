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
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService, ServiceResponse, Cliente } from '../cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css'],
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
export class ClienteEditComponent implements OnInit {
  clienteForm: FormGroup;
  clienteId: number;
  tiposEmprestimo = ['INSS', 'ServidorPublico', 'Militar', 'Privado'];
  statusEmprestimo = ['EmAnalise', 'Aprovado', 'Reprovado', 'Liquidado', 'Inadimplente'];
  isFormChanged = false;
  originalFormValue: any;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      tipoEmprestimo: ['', Validators.required],
      statusEmprestimo: ['', Validators.required],
      valorEmprestimo: [0, [Validators.required, Validators.min(0)]],
      qtdParcelas: [0, [Validators.required, Validators.min(1)]],
      valorParcela: [0, [Validators.required, Validators.min(0)]],
      dataContratacao: [new Date(), Validators.required]
    });

    this.isFormChanged = false;

    Object.keys(this.clienteForm.controls).forEach(key => {
      this.clienteForm.get(key)?.valueChanges.subscribe(() => {
        this.isFormChanged = true;
      });
    });
  }

  ngOnInit(): void {
    this.carregarCliente();
  }

  carregarCliente(): void {
    this.clienteService.getClienteById(this.clienteId).subscribe({
      next: (response: ServiceResponse<Cliente>) => {
        if (response.sucesso && response.dados) {
          const cliente = response.dados;
          this.clienteForm.patchValue({
            nome: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            tipoEmprestimo: cliente.tipoEmprestimo,
            statusEmprestimo: cliente.statusEmprestimo,
            valorEmprestimo: cliente.valorEmprestimo,
            qtdParcelas: cliente.qtdParcelas,
            valorParcela: cliente.valorParcela,
            dataContratacao: new Date(cliente.dataContratacao)
          });
          this.isFormChanged = false;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const clienteData = {
        ...this.clienteForm.value,
        id: this.clienteId
      };

      this.clienteService.updateCliente(clienteData).subscribe({
        next: (response) => {
          if (response.sucesso) {
            this.router.navigate(['/clientes']);
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar cliente:', error);
        }
      });
    }
  }

  voltar(): void {
    this.location.back();
  }
}
