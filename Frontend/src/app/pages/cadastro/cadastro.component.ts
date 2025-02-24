import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteFormComponent } from "../../componentes/cliente-form/cliente-form.component";
import { Cliente } from '../../models/Cliente';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ClienteFormComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  createCliente(cliente:Cliente){};

}
