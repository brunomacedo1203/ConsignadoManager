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
  clienteForm!: FormGroup;
  clienteId: number;
  tiposEmprestimo = ['INSS', 'ServidorPublico', 'Militar', 'Privado'];
  statusEmprestimo = ['EmAnalise', 'Aprovado', 'Reprovado', 'Liquidado', 'Inadimplente'];
  isFormChanged = false;
  private initialFormValue: any;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      tipoEmprestimo: ['', Validators.required],
      statusEmprestimo: ['', Validators.required],
      valorEmprestimo: [0, [Validators.required, Validators.min(0)]],
      qtdParcelas: [0, [Validators.required, Validators.min(1)]],
      valorParcela: [0, [Validators.required, Validators.min(0)]],
      dataContratacao: [new Date(), Validators.required]
    });

    // Monitora mudanças no formulário
    this.clienteForm.valueChanges.subscribe(() => {
      this.isFormChanged = JSON.stringify(this.clienteForm.getRawValue()) !== JSON.stringify(this.initialFormValue);
    });

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
          this.initialFormValue = this.clienteForm.getRawValue();
          this.isFormChanged = false;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const clienteData = {
      id: this.clienteId,
      ...this.clienteForm.getRawValue(),
      valorEmprestimo: Number(this.clienteForm.get('valorEmprestimo')?.value),
      qtdParcelas: Number(this.clienteForm.get('qtdParcelas')?.value),
      valorParcela: Number(this.clienteForm.get('valorParcela')?.value),
      dataContratacao: new Date(this.clienteForm.get('dataContratacao')?.value).toISOString(),
      ativo: true
    };

    this.clienteService.updateCliente(clienteData).subscribe({
      next: (response) => {
        if (response.sucesso) {
          this.router.navigate(['/clientes']);
        } else {
          console.error('Erro ao atualizar cliente:', response.mensagem);
        }
      },
      error: (error) => {
        console.error('Erro ao atualizar cliente:', error);
      }
    });
  }

  voltar(): void {
    this.location.back();
  }
}
