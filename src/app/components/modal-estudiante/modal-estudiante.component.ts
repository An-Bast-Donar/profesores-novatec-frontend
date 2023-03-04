import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-estudiante',
  templateUrl: './modal-estudiante.component.html',
  styleUrls: ['./modal-estudiante.component.scss']
})
export class ModalEstudianteComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalEstudianteComponent>
  ) {}
  cerrarModal(): void {
    this.dialogRef.close();
  }
}
