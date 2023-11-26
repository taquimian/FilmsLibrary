const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer'); 

const app = express();

// Configuración de multer para almacenar las imágenes en el servidor
const storage = multer.memoryStorage(); // Opciones de almacenamiento en memoria
const upload = multer({ storage: storage });

// Configuración de CORS para permitir solicitudes desde tu aplicación Angular
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'taquimian',
  password: 'Arkantos96@',
  database: 'filmsLibraryBD'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a MySQL establecida');
});

// Ruta para obtener todas las películas
app.get('/api/peliculas/listar', (req, res) => {
  const query = 'SELECT id, titulo, descripcion, anio, imagen, nombreImagen FROM peliculas'; // Asegúrate de incluir nombreImagen
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener películas:', error);
      res.status(500).json({ error: 'Error al obtener películas' });
      return;
    }

    const peliculasConImagenesBase64 = results.map((pelicula) => {
      if (pelicula.imagen && Buffer.isBuffer(pelicula.imagen) && pelicula.nombreImagen) {
        const base64Image = Buffer.from(pelicula.imagen).toString('base64');
        const extension = obtenerExtension(pelicula.nombreImagen);
        pelicula.imagen = `data:image/${extension};base64,${base64Image}`;
      }
      return pelicula;
    });

    res.json(peliculasConImagenesBase64);
  });
});

function obtenerExtension(nombreArchivo) {
  const splitArray = nombreArchivo.split('.');
  return splitArray[splitArray.length - 1];
}

app.post('/api/peliculas/agregar', upload.single('imagen'), (req, res) => {
  const nuevaPelicula = req.body;
  const imagen = req.file; // La imagen se encuentra en req.file

  // Insertar la nueva película en la base de datos junto con la imagen y el nombre de la imagen
  const query = 'INSERT INTO peliculas (titulo, descripcion, anio, imagen, nombreImagen) VALUES (?, ?, ?, ?, ?)';
  const values = [
    nuevaPelicula.titulo,
    nuevaPelicula.descripcion,
    nuevaPelicula.anio,
    imagen.buffer, // Verifica si la referencia correcta es 'imagen.buffer' o 'imagen' para la inserción del blob
    nuevaPelicula.nombreImagen
  ];

  connection.query(query, values, (error, results) => {
    // Manejo de errores y respuesta al cliente
  });
});


// Otros endpoints para realizar operaciones CRUD

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en el puerto ${PORT}`);
});
