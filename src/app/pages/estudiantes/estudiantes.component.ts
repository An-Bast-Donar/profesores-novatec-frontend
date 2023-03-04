import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEstudianteComponent } from 'src/app/components/modal-estudiante/modal-estudiante.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private estudianteService: EstudianteService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.estudianteService.findAll().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    });
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.estudianteService.deleteById(id).subscribe(() => {
        this.estudiantes = this.estudiantes.filter(
          (estudiante) => estudiante.id !== id
        );
      });
    }
  }

  abrirModal(id: number): void {
    const dialogRef = this.dialog.open(ModalEstudianteComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrado: ${result}`);
    });
  }
}
