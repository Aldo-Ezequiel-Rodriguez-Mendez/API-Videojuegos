const express = require('express');
const router  = express.Router();

const controlVideojuego = require('../controllers/control_videojuego'); 
router.get('/videojuego', controlVideojuego.obtenerTodosVideojuegos);
router.post('/videojuego', controlVideojuego.subirImg, controlVideojuego.nuevoVideojuego);
router.delete('/videojuego', controlVideojuego.borrarTodosVideojuegos);

router.get('/videojuego/:id', controlVideojuego.obtenerUnVideojuego);
router.post('/videojuego/:id', controlVideojuego.nuevoComentario);
router.delete('/videojuego/:id', controlVideojuego.borrarUnVideojuego);

module.exports = router;    // exportamos las rutas para usarlas en el servidor.js