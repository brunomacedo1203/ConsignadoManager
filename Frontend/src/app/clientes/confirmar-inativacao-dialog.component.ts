import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-inativacao-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirmação</h2>
    <mat-dialog-content>
      Tem certeza que deseja inativar este cliente?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Voltar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Sim</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ConfirmarInativacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarInativacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
