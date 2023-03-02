import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from 'src/app/models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private apiUrl = `${environment.apiBaseUrl}/Estudiantes`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  findById(id: number): Observable<Estudiante> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Estudiante>(url);
  }

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante);
  }

  update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Estudiante>(url, estudiante);
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
