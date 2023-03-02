import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private estudianteService: EstudianteService) {}

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
}
