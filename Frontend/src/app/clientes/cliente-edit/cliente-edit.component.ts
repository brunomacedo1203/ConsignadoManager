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
  isSubmitting = false;
  private initialFormValue: any = {};
  private clienteOriginal: Cliente | null = null;
  private isInitialLoad = true;

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
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      tipoEmprestimo: ['', Validators.required],
      statusEmprestimo: ['', Validators.required],
      valorEmprestimo: [0, [Validators.required, Validators.min(0)]],
      qtdParcelas: [0, [Validators.required, Validators.min(1)]],
      valorParcela: [0, [Validators.required, Validators.min(0)]],
      dataContratacao: [new Date(), Validators.required]
    });

    this.carregarCliente();
  }

  carregarCliente(): void {
    this.clienteService.getClienteById(this.clienteId).subscribe({
      next: (response: ServiceResponse<Cliente>) => {
        if (response.sucesso && response.dados) {
          this.clienteOriginal = response.dados;
          this.clienteForm.patchValue({
            nome: this.clienteOriginal.nome,
            cpf: this.clienteOriginal.cpf,
            email: this.clienteOriginal.email,
            tipoEmprestimo: this.clienteOriginal.tipoEmprestimo,
            statusEmprestimo: this.clienteOriginal.statusEmprestimo,
            valorEmprestimo: this.clienteOriginal.valorEmprestimo,
            qtdParcelas: this.clienteOriginal.qtdParcelas,
            valorParcela: this.clienteOriginal.valorParcela,
            dataContratacao: new Date(this.clienteOriginal.dataContratacao)
          }, { emitEvent: false });

          this.initialFormValue = this.clienteForm.getRawValue();
          this.isFormChanged = false;
          this.isInitialLoad = false;

          // Adiciona o monitoramento de mudanças após carregar os dados iniciais
          this.clienteForm.valueChanges.subscribe(() => {
            if (!this.isInitialLoad) {
              const formValue = this.clienteForm.getRawValue();
              this.isFormChanged = Object.keys(formValue).some(key =>
                JSON.stringify(formValue[key]) !== JSON.stringify(this.initialFormValue[key])
              );
            }
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    if (!this.clienteOriginal) {
      return;
    }

    this.isSubmitting = true;

    const formValue = this.clienteForm.getRawValue();
    const camposAlterados: { [key: string]: any } = {};

    // Verifica quais campos foram alterados
    Object.keys(formValue).forEach(key => {
      // Simplifica a comparação para valores primitivos
      if (key === 'email' || key === 'cpf' || key === 'nome') {
        // Comparação direta para strings
        if (formValue[key] !== this.initialFormValue[key]) {
          camposAlterados[key] = formValue[key];
          console.log(`Campo ${key} alterado de '${this.initialFormValue[key]}' para '${formValue[key]}'`);
        }
      } else if (key === 'dataContratacao') {
        // Trata datas separadamente
        const dataOriginal = new Date(this.initialFormValue[key]).toISOString().split('T')[0];
        const dataAtual = new Date(formValue[key]).toISOString().split('T')[0];
        if (dataOriginal !== dataAtual) {
          camposAlterados[key] = formValue[key];
        }
      } else {
        // Para outros tipos de dados
        if (JSON.stringify(formValue[key]) !== JSON.stringify(this.initialFormValue[key])) {
          camposAlterados[key] = formValue[key];
        }
      }
    });

    // Se nenhum campo foi alterado, não faz nada
    if (Object.keys(camposAlterados).length === 0) {
      this.router.navigate(['/clientes']);
      this.isSubmitting = false;
      return;
    }

    // SOLUÇÃO RADICAL: Criar uma cópia do formulário sem validações para submissão
    const clienteData: Cliente = {
      ...this.clienteOriginal,  // Mantém os dados originais
      id: this.clienteId,
      // Sobrescreve apenas os campos que foram alterados
      ...camposAlterados,
      // Garante que os campos numéricos sejam convertidos corretamente
      valorEmprestimo: Number(formValue.valorEmprestimo),
      qtdParcelas: Number(formValue.qtdParcelas),
      valorParcela: Number(formValue.valorParcela),
      // Garante que a data seja convertida corretamente
      dataContratacao: new Date(formValue.dataContratacao),
      ativo: true
    };

    console.log('Enviando dados do cliente:', clienteData);

    this.clienteService.updateCliente(clienteData).subscribe({
      next: (response) => {
        if (response.sucesso) {
          this.router.navigate(['/clientes']);
        } else {
          console.error('Erro ao atualizar cliente:', response.mensagem);
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Erro ao atualizar cliente:', error);
        this.isSubmitting = false;
      }
    });
  }


  voltar(): void {
    this.location.back();
  }
}
