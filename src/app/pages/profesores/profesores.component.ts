import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalProfesorComponent } from 'src/app/components/modal-profesor/modal-profesor.component';
import { Profesor } from 'src/app/models/profesor';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss'],
})
export class ProfesoresComponent implements OnInit {
  profesores: Profesor[] = [];
  profesor: Profesor | undefined;

  constructor(private profesorService: ProfesorService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.profesorService.findAll().subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
      this.profesorService.deleteById(id).subscribe(() => {
        this.profesores = this.profesores.filter(
          (profesor) => profesor.id !== id
        );
      });
    }
  }
  
  abrirModal(id: number): void {
    const dialogRef = this.dialog.open(ModalProfesorComponent);
    dialogRef.afterOpened().subscribe(result => {
      this.buscarProfesor(id);
      console.log(`Modal abierto: ${result}`);
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal cerrado: ${result}`);
    });
  }

  buscarProfesor(id: number): void {
    this.profesorService.findById(id).subscribe((profesor) => {
      this.profesor = profesor;
      console.log(this.profesor);
    });
  }
}
