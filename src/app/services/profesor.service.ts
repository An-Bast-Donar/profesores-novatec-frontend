import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesor } from 'src/app/models/profesor';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private apiUrl = `${environment.apiBaseUrl}/Profesores`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  findById(id: number): Observable<Profesor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Profesor>(url);
  }

  create(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, profesor);
  }

  update(id: number, profesor: Profesor): Observable<Profesor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Profesor>(url, profesor);
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

