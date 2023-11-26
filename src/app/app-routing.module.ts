import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { AgregarPeliculaComponent } from './agregar-pelicula/agregar-pelicula.component';

const routes: Routes = [
  { path: 'peliculas', component: ListaPeliculasComponent },
  { path: 'agregar-pelicula', component: AgregarPeliculaComponent },
  { path: 'detalle-pelicula/:id', component: DetallePeliculaComponent }
  // ... Puedes seguir agregando rutas según la estructura de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
