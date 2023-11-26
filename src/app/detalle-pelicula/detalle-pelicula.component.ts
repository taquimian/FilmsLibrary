import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
  detalleForm!: FormGroup;
  camposDeshabilitados = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private peliculasService: PeliculasService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.detalleForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      anio: [0],
      urlImagen: ['']
      // Agrega otros campos aquí
    });

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.cargarDetallesPelicula(id);
    });
  }

  cargarDetallesPelicula(id: number): void {
    this.peliculasService.obtenerPeliculaPorId(id).subscribe((pelicula: any) => {
      if (pelicula) {
        this.detalleForm.patchValue({
          titulo: pelicula.titulo || null,
          descripcion: pelicula.descripcion || null,
          anio: pelicula.anio || null,
          urlImagen: pelicula.urlImagen || null
          // Actualiza otros campos según los datos de la película
        });
      }
    });
  }
  

  getImagenUrl(): string {
    const urlImagen = this.detalleForm.get('urlImagen')?.value;
    return urlImagen ? `url(${urlImagen})` : '';
  }

  volver(): void {
    this.router.navigate(['/peliculas']);
  }
}
