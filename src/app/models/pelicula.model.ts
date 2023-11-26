
export interface Pelicula {
    id: number;
    titulo: string;
    descripcion: string;
    anio: number;
    imagen: Blob | null;
    urlImagen?: string;
    nombreImagen: string;
    // Otros campos relevantes para tu película
  }
  