import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';
import { Pelicula } from '../models/pelicula.model';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
  pelicula: Pelicula | undefined;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.getDetallePelicula();
  }

  getDetallePelicula(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.pelicula = this.peliculasService.getPeliculaById(id);
  }

  eliminarPelicula(id: number): void {
    //this.peliculasService.eliminarPelicula(id);
    // Implementar la lógica para redirigir o actualizar la lista después de eliminar
  }
}
