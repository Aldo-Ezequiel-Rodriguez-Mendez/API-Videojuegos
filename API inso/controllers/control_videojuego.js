const Videojuego = require('../models/model_videojuego'); //importamos el modelo videojuego
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Parcial3/API inso/archivos'); //Direccion de mi carpeta archivo
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const subirImg = multer({storage: storage}).single('image');
//GET '/videojuego'
const obtenerTodosVideojuegos = (req, res, next) => {
    Videojuego.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//POST '/videojuego'
const nuevoVideojuego = (req, res, next) => {
     //verifica si un videojuego con un ID YA EXISTE en la BD
    Videojuego.findOne({ id: req.body.id }, (err, data) => {

        //if el videojuego no existe en la BD, agregalo...
        if (!data) {
            //creamos un nuevo objeto videojuego con ayuda del modelo Videojuego y con req.body
            const nuevoVideojuego = new Videojuego({
                id: req.body.id,
                descripcion: req.body.descripcion
            })

            // guardamos este objeto en la base de datos
            nuevoVideojuego.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //si hay un error o el videojuego ya esta en la BD, regresa este mensaje...        
        }else{
            if(err) return res.json(`Algo salió mal :(... por favor intentalo de nuevo.${err}`);
            return res.json({message:"El videojuego ya existe!"});
        }
    })   
};

//DELETE '/videojuego'
const borrarTodosVideojuegos = (req, res, next) => {
    Videojuego.deleteMany({}, err => {
        if(err) {
        return res.json({message: "Error al completar la eliminación :("});
        }
        return res.json({message: "Eliminación completada!"});
    })
};

//GET '/videojuego/:id'
const obtenerUnVideojuego = (req, res, next) => {
    let id = req.params.id; //obten el id del videojuego

    //encuentra un videojuego especifico con ese id
    Videojuego.findOne({id:id}, (err, data) => {
    if(err || !data) {
        return res.json({message: "El videojuego no existe!"});
    }
    else return res.json(data); //regresa el videojuego encontrado
    });
};

//POST '/videojuego/:id'
const nuevoComentario= (req, res, next) => {
    let id = req.params.id; 
    let nuevoComentario = req.body.comentario; 

    const comentario = {
        texto: nuevoComentario,
        fecha: new Date()
    }

    Videojuego.findOne({id:id}, (err, data) => {
        if(err || !data || !nuevoComentario ) {
            return res.json({message: "El videojuego no existe!"});
        }
        else {
            data.comentarios.push(comentario);
            //guarda los cambios en la BD
            data.save(err => {
                if (err) { 
                    return res.json({message: "La actualización de la descripción ha fallado :(", error:err});
                }
            return res.json(data);
            })  
        } 
    })
};

//DELETE '/videojuego/:id'
const borrarUnVideojuego = (req, res, next) => {
    let id = req.params.id; // get the name of tea to delete

    Videojuego.deleteOne({id:id}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "El videojuego no existe!"});
    //else if there's an error, return the err message
    else if (err) return res.json(`Algo ha sucedido, intentalo de nuevo. ${err}`);
    //else, return the success message
    else return res.json({message: "Videojuego eliminado."});
    });
};


module.exports = {
    nuevoVideojuego,
    obtenerTodosVideojuegos,
    subirImg,              //Sirve para guardar imagenes
    borrarTodosVideojuegos,
    obtenerUnVideojuego,
    nuevoComentario,
    borrarUnVideojuego
};