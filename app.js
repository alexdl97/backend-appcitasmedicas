
const express = require('express');
const app = express();

const rolmodel = require('./modelo/rol_model');
var bodyParser = require('body-parser');
const conexion = require('./conexion');
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.get('/', function (req, res) {
  res.send('Hello World')
});

//LOGIN
app.post('/user/login', jsonParser, (req, res) => {
    
    let { user, pass } = req.body;
    conexion.query(`SELECT * from usuario where user='${user}' and pass='${pass}'`, (error, results, fields) => {
        if (error) {
            return res.json({
                error: error.message
            });
        }

        if (results.length > 0) {
            res.json({
                ok: true,
                message: 'Usuario correcto'
            });
        } else {
            ok: false,
            res.json({
                message: 'Usuario o contraseña incorrectos.'
            });
        }
    });

});

//RUTAS PARA ROL
app.get('/rol', async (req, res) => {
    
    let rows = await rolmodel.getAll();
    return res.json({
        ok: true,
        roles: rows
    });

});

app.post('/rol', jsonParser, (req, res) => {

    console.log(req.body);
    rolmodel.create(req.body);

    return res.json({
        ok: true,
        message: 'Se creo el rol correctamente'
    });

});

app.put('/rol/:id', jsonParser, (req, res) => {

    rolmodel.update({
        ...req.body,
        id: req.params.id
    });

    return res.json({
        ok: true,
        message: 'Se actualizo el rol correctamente'
    });

});

app.delete('/rol/:id', jsonParser, (req, res) => {
    rolmodel.deleti(req.params.id);
    return res.json({
        ok: true,
        message: 'Se elimino el rol correctamente'
    });
});

 
app.listen(3000, () => {
    console.log('Escuchando el puerto 3000');
});