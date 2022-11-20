const express = require('express');
const router  = express.Router();
const app = express();


app.use(express.text());
app.use(express.json());



const controlVideojuego = require('../controllers/control_videojuego'); 
router.get('/', controlVideojuego.obtenerTodosVideojuegos);
router.post('/', controlVideojuego.subirImg, controlVideojuego.nuevoVideojuego);
router.delete('/', controlVideojuego.borrarTodosVideojuegos);

router.get('/:id', controlVideojuego.obtenerUnVideojuego);
router.post('/:id', controlVideojuego.nuevoComentario);
router.delete('/:id', controlVideojuego.borrarUnVideojuego);

module.exports = router;    // exportamos las rutas para usarlas en el servidor.js