import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { PeliculasService } from '../services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.component.html',
  styleUrls: ['./lista-peliculas.component.css']
})
export class ListaPeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];

  constructor(private router: Router, private peliculasService: PeliculasService) {}
  

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  async obtenerPeliculas(): Promise<void> {
    try {
      this.peliculas = []; // Inicializa peliculas como un array vacío
      const data = await this.peliculasService.obtenerPeliculas().toPromise();
      if (data) {
        this.peliculas = data.map((pelicula: any) => {
          if (pelicula.imagen && pelicula.nombreImagen) {
            return {
              ...pelicula,
              urlImagen: pelicula.imagen, // Utiliza directamente la cadena base64 para la URL
              nombreImagen: pelicula.nombreImagen // Agregar el nombre de la imagen
            };
          }
          return pelicula;
        });
      } else {
        console.error('No se recibieron datos válidos');
      }
    } catch (error) {
      console.error('Error al obtener películas', error);
    }
  }
  
  obtenerExtension(nombreArchivo: string): string {
    const splitArray = nombreArchivo.split('.');
    return splitArray[splitArray.length - 1]; // Obtiene la última parte después del último punto
  }
  
  arrayBufferToBase64(buffer: any[]): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  }

  verDetallePelicula(idPelicula: number): void {
    this.router.navigate(['/detalle-pelicula', idPelicula]);
  }
  
  eliminarPelicula(id: number): void {
    // Lógica para eliminar la película con el ID especificado de la lista y de la base de datos
    // Aquí debes realizar la lógica para eliminar el registro de la base de datos utilizando el ID
    // Además, elimina la película de la lista en tu componente
    this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id);
  }

  chunkArray(array: any[], size: number): any[] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

}
