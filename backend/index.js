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

// Ruta para obtener una película por su ID
app.get('/api/peliculas/obtener/:id', (req, res) => {
  const idPelicula = req.params.id; // ID de la película a buscar en la base de datos

  const query = 'SELECT id, titulo, descripcion, anio, imagen, nombreImagen FROM peliculas WHERE id = ?';
  connection.query(query, [idPelicula], (error, results) => {
    if (error) {
      console.error('Error al obtener la película por ID:', error);
      res.status(500).json({ error: 'Error al obtener la película por ID' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Película no encontrada' });
      return;
    }

    const pelicula = results[0];
    if (pelicula.imagen && Buffer.isBuffer(pelicula.imagen) && pelicula.nombreImagen) {
      const base64Image = Buffer.from(pelicula.imagen).toString('base64');
      const extension = obtenerExtension(pelicula.nombreImagen);
      pelicula.imagen = `data:image/${extension};base64,${base64Image}`;
    }

    res.json(pelicula);
  });
});


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

app.post('/api/peliculas/modificar/:id', upload.single('imagen'), (req, res) => {
  const idPelicula = req.params.id; // ID de la película a modificar
  const datosActualizados = req.body;
  const nuevaImagen = req.file; // Nueva imagen, si se proporciona

  // Construir la consulta de actualización (UPDATE) según los campos que se desean modificar
  let query = 'UPDATE peliculas SET ';
  const values = [];
  
  // Comprobar y agregar los campos que se desean actualizar
  if (datosActualizados.titulo) {
    query += 'titulo = ?, ';
    values.push(datosActualizados.titulo);
  }
  if (datosActualizados.descripcion) {
    query += 'descripcion = ?, ';
    values.push(datosActualizados.descripcion);
  }
  if (datosActualizados.anio) {
    query += 'anio = ?, ';
    values.push(datosActualizados.anio);
  }
  if (nuevaImagen) {
    query += 'imagen = ?, nombreImagen = ?, ';
    values.push(nuevaImagen.buffer); // Verifica si la referencia correcta es 'nuevaImagen.buffer' o 'nuevaImagen' para la actualización del blob
    values.push(datosActualizados.nombreImagen);
  }
  
  // Eliminar la coma final y agregar la condición WHERE con el ID de la película
  query = query.slice(0, -2); // Eliminar la última coma y espacio
  query += ' WHERE id = ?';
  values.push(idPelicula);

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
