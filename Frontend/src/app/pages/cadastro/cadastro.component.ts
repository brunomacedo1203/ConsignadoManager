import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteFormComponent } from '../../componentes/cliente-form/cliente-form.component';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ClienteFormComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  constructor(private clienteService: ClienteService, private router: Router) {}

  createCliente(cliente: Cliente) {
    console.log('Dados do cliente:', cliente);
    this.clienteService.CreateCliente(cliente).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }
}
