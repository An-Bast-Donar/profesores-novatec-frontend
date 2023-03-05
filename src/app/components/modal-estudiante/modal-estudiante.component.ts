import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estudiante } from 'src/app/models/estudiante';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-estudiante',
  templateUrl: './modal-estudiante.component.html',
  styleUrls: ['./modal-estudiante.component.scss'],
})
export class ModalEstudianteComponent implements OnInit {
  formulario!: FormGroup;
  estadoTitulo?: string;
  estadoBoton?: string;

  constructor(
    public dialogRef: MatDialogRef<ModalEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estudiante,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      carrera: ['', Validators.required],
      promedio: ['', Validators.required],
    });
    if (this.data != null) {
      this.estadoTitulo = 'Editar';
      this.estadoBoton = 'Guardar cambio';
      this.formulario.setValue({
        nombre: this.data.nombre,
        edad: this.data.edad,
        correoElectronico: this.data.correo,
        carrera: this.data.carrera,
        promedio: this.data.promedio,
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
        carrera: this.formulario.value.carrera,
        promedio: this.formulario.value.promedio,
      };
      if (
        this.data != null &&
        confirm('¿Estás seguro de que deseas modificar este estudiante?')
      ) {
        this.dialogRef.close(datos);
      }
      if (
        this.data == null &&
        confirm('¿Estás seguro de que deseas crear este estudiante?')
      ) {
        this.dialogRef.close(datos);
      }
    } else {
      alert('Debes diligenciar los campos correctamente');
    }
  }
}
