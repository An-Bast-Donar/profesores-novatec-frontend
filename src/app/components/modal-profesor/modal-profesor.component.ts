import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesor } from 'src/app/models/profesor';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-profesor',
  templateUrl: './modal-profesor.component.html',
  styleUrls: ['./modal-profesor.component.scss']
})
export class ModalProfesorComponent implements OnInit {
  formulario!: FormGroup;
  estadoTitulo?: string;
  estadoBoton?: string;
  
  constructor(
    public dialogRef: MatDialogRef<ModalProfesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profesor,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
      fechaContrato: ['', Validators.required],
    });
    if (this.data != null) {
      this.estadoTitulo = 'Editar';
      this.estadoBoton = 'Guardar cambio';
      this.formulario.setValue({
        nombre: this.data.nombre,
        edad: this.data.edad,
        correoElectronico: this.data.correo,
        especialidad: this.data.especialidad,
        fechaContrato: this.data.fechaContrato,
      });
    } else {
      this.estadoTitulo = 'Crear';
      this.estadoBoton = 'Crear nuevo';
    }
  }

  guardarCambios() {
    if (this.formulario.valid) {
      const datos = {
        nombre: this.formulario.value.nombre,
        edad: this.formulario.value.edad,
        correo: this.formulario.value.correoElectronico,
        especialidad: this.formulario.value.especialidad,
        fechaContrato: this.formulario.value.fechaContrato,
      };
      if (
        this.data != null &&
        confirm('¿Estás seguro de que deseas modificar este profesor?')
      ) {
        this.dialogRef.close(datos);
      }
      if (
        this.data == null &&
        confirm('¿Estás seguro de que deseas crear este profesor?')
      ) {
        this.dialogRef.close(datos);
      }
    } else {
      alert('Debes diligenciar los campos correctamente');
    }
  }
}
