var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: '127.0.0.1',
    database: 'taller_db',
    user: 'root',
    password: '123456789'
});

conexion.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('Conexion exitosa');
    }
});

module.exports = conexion;