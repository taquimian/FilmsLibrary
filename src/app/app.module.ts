import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPeliculasComponent } from './lista-peliculas/lista-peliculas.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { AgregarPeliculaComponent } from './agregar-pelicula/agregar-pelicula.component';
import { HttpClientModule, HttpClient, provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ListaPeliculasComponent,
    DetallePeliculaComponent,
    AgregarPeliculaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    AppRoutingModule,
  ],
  providers: [
    {
    provide: HttpClient,
    useClass: HttpClient,
    deps: [provideHttpClient],
    },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
