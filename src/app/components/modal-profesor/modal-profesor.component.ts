import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-profesor',
  templateUrl: './modal-profesor.component.html',
  styleUrls: ['./modal-profesor.component.scss']
})
export class ModalProfesorComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalProfesorComponent>
  ) {}
  cerrarModal(): void {
    this.dialogRef.close();
  }
}
