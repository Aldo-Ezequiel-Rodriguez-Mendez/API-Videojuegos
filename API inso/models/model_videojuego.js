const mongoose = require("mongoose"); //import mongoose

// Videojuego esquema (schema)
const VideojuegoSchema = new mongoose.Schema({
    id: {type:String, required:true},
    image: String,
    description: String,
    comentarios : [{ texto: String, fecha: {type:String, default: new Date()} }]
});

const Videojuego = mongoose.model('Videojuego', VideojuegoSchema); //convert to model named Videojuego
module.exports = Videojuego; //export for controller use
