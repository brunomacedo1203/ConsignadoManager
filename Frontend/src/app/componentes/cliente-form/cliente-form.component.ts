import { Component, OnInit, Output, EventEmitter } from '@angular/core'; // Corrigido o import
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../models/Cliente';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  imports: [ReactiveFormsModule]
})
export class ClienteFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Cliente>();

  clienteForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
      email: new FormControl(''),
      ativo: new FormControl(true),
      dataDeCriacao: new FormControl(new Date().toISOString()),
      dataDeAlteracao: new FormControl(new Date().toISOString()),
      tipoEmprestimo: new FormControl('', Validators.required),
      statusEmprestimo: new FormControl(''),
      valorEmprestimo: new FormControl(0),
      qtdParcelas: new FormControl(1),
      valorParcela: new FormControl(0),
      dataContratacao: new FormControl(''),
    });
  }

  submit() {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      this.onSubmit.emit(cliente);
      console.log('Dados enviados:', cliente);

    }
  }
}
