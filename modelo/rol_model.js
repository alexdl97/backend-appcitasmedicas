const conexion = require('../conexion');

const getAll = () => {

    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM rol', (error, results, fields) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });    
    });

    
};

const create = (params) => {

    conexion.query(`insert into rol(nombre, descripcion) values('${params.nombre}','${params.descripcion}')`, (error, results, fields) => {
        if (error) {
            throw error;
        }
    });  

}

const update = (params) => {

    conexion.query(`update rol set nombre = '${params.nombre}', descripcion = '${params.descripcion}' where id = ${params.id}`, (error, results, fields) => {
        if (error) {
            throw error;
        }
    });  

};

const deleti = (id) => {
    conexion.query(`delete from rol where id = ${id}`, (error, results, fields) => {
        if (error) {
            throw error;
        }
    }); 
};


module.exports = {
    getAll,
    create,
    update,
    deleti
}

