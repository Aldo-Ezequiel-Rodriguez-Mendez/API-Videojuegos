const express = require("express")
const helmet = require('helmet');
const rutas = require('./routes/ruta_videojuego'); //IMPORTAMOS LAS RUTAS
const path = require("path");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(helmet());

const PORT = 8080

const swaggerUI  = require('swagger-ui-express');
const swaggerJsDoc  = require('swagger-jsdoc');


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Videojuegos',
            version: '1.0.0',      
        },
        servers:[{url: "http://localhost:8080"}],  
    },
        apis: [`${path.join(__dirname,"./routes/ruta_videojuego.js")}`],  
};

//CONEXION A LA BASE DE DATOS DE MONGO DB
mongoose.connect(
    'mongodb+srv://Aldo:ezequiel123@cluster0.telfxp2.mongodb.net/?retryWrites=true&w=majority',{ 
        //useFindAndModify: false,  //ESTAS PROPIEDADES YA NO ESTAN SOPORTADAS APARTIR DE MONGO DB 6.0
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        //server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }}, 
        //replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 }}
        //useCreateIndex: true      //ESTAS PROPIEDADES YA NO ESTAN SOPORTADAS APARTIR DE MONGO DB 6.0
    }, 
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

app.use(express.text())
app.use(express.json())

const compression = require('compression');
app.use(compression());


app.use("/videojuego",rutas)  //USAMOS LAS RUTAS que estan dentro de ruta_videojuego
app.use('/archivos', express.static(`${path.join(__dirname,"./archivos")}`)); //RUTA PARA CARGAR IMAGENEs de la carpeta de archivos

app.route('/')
    .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor express escuchando en puerto ' + PORT);
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));