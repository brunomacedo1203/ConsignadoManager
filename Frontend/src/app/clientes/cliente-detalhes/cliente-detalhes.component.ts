import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ClienteDetalhesComponent {
  constructor(
    public dialogRef: MatDialogRef<ClienteDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
