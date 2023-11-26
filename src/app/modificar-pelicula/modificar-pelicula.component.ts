import { Component } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { Pelicula } from '../models/pelicula.model';

@Component({
  selector: 'app-modificar-pelicula',
  templateUrl: './modificar-pelicula.component.html',
  styleUrl: './modificar-pelicula.component.css'
})
export class ModificarPeliculaComponent {
  modPelicula: Pelicula = {
    id: 0,
    titulo: '',
    descripcion: '',
    anio: 0,
    imagen: null,
    nombreImagen: '',
  };

  selectedImageFile: File | null = null;

  constructor(private peliculasService: PeliculasService) {}

  modificarPelicula(): void {
    console.log('Datos a modificar:', this.modPelicula, this.selectedImageFile);

      const formData = new FormData();
      formData.append('titulo', this.modPelicula.titulo);
      formData.append('descripcion', this.modPelicula.descripcion);
      formData.append('anio', this.modPelicula.anio.toString());

      if(this.selectedImageFile != null){
        this.modPelicula.nombreImagen = this.selectedImageFile.name;
        formData.append('nombreImagen', this.modPelicula.nombreImagen);
        formData.append('imagen', this.selectedImageFile); 
      }
  
      /*this.peliculasService.modificarPelicula(formData).subscribe(
        (response) => {
          console.log('Película modificada correctamente', response);
          alert('Se modificó la película correctamente en el sistema');
          this.modPelicula = {
            id: 0,
            titulo: '',
            descripcion: '',
            anio: 0,
            imagen: null,
            nombreImagen: ''
          };
          this.selectedImageFile = null; // Limpiar la imagen seleccionada
        },
        (error) => {
          console.error('Error al agregar película', error);
          alert('¡Oh no! Hubo un error al agregar la película');
        }
      );*/
  }
  
  

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedImageFile = files[0];
      console.log('Archivo seleccionado:', this.selectedImageFile);
      this.convertFileToBlob(this.selectedImageFile);
    }
  }
  

  convertFileToBlob(file: File): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
      this.modPelicula.imagen = blob;
    };
  }
}
