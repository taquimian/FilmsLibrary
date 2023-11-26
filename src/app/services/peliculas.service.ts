import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = 'http://localhost:3000/api/peliculas'; // URL de tu backend

  constructor(private http: HttpClient) {}

    agregarPelicula(pelicula: FormData): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/agregar`, pelicula);
    }

    // Método para obtener todas las películas
    obtenerPeliculas(): Observable<Pelicula[]> {
      return this.http.get<Pelicula[]>(`${this.apiUrl}/listar`);
    }
}
