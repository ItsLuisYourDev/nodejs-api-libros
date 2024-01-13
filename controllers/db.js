const metodosBd = {}
const db = require('../database/db');

//? crud database
//!Consultar datos
metodosBd.getAll = (req, res) => {
    db.find({}, (err, datos) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(datos)
        }
    })
}
//!Consutar datos por id
metodosBd.getId = (req, res) => {
    const userId = req.params.id;
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
}
//!consultar contenido de un libro
metodosBd.getContentId = (req, res) => {
    const userId = req.params.id;
    console.log("Este es el id")
    console.log(req.params.id)
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({texto:user.texto,url:user.img});
        }
    });
}

//!Consutar datos varios
metodosBd.getFilter = (req, res) => {
    const ids = req.body.libros;
    db.find({ _id: { $in: ids } }, (err, users) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(users);
        }
    });
};


//!INSERTAR DATOS
metodosBd.insert = (req, res) => {
    console.log(req.body)
    const data = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        img: req.body.img,
        descripcion: req.body.descripcion,
        texto:req.body.texto
    }
    db.insert(data, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
}

//!borrar datos
metodosBd.deleted = (req, res) => {
    const userId = req.params.id;
    console.log("entro xd ")
    db.remove({ _id: userId }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: `Usuario eliminado: ${numRemoved} registros eliminados` });
        }
    });
}

//!borrar todos datos
metodosBd.deleteAll = ((req, res) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: `Todos los usuarios eliminados: ${numRemoved} registros eliminados` });
        }
    });
});
module.exports = metodosBd;

// ! actualilzar datos
metodosBd.update = (req, res) => {
    const userId = req.params.id;
    const newData = req.body.newData;
    db.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            user.contenido.push(newData)
            const updatedUser = user;
            db.update({ _id: userId }, { $set: updatedUser }, {}, (err, numReplaced) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({ message: `Usuario actualizado: ${numReplaced} registros modificados` });
                }
            });

        }
    });
}
module.exports = metodosBd;