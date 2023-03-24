const express = require("express");
const router = express.Router();
const fs = require("fs");

const PATH_ROUTES = __dirname;

/**
 * Toma el nombre de un archivo(file.js) y lo separa de lo que esta despues del punto formando un arreglo (['file'][js]) 
 * para posteriormente retornar el primer elemento de este arreglo u objeto que en este ejemplo seria file.
 * @param {*} filename 
 * @returns 
 */
const removeFileExtension = (fileName) => {
    return fileName.split('.').shift();
}

/**
 * Esta funcionalidad nos permite mitigar el hecho de realizar imports por cada archivo de rutas creado,
 * De esta manera solo se debe importar el archivo index.js en el app.js y este archivo(index.js)
 * es el que se encarga de importar los archivos de las rutas de manera dinamica.
 */
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const fileName = removeFileExtension(file);
    if (fileName !== 'index') {
        console.log(`Cargando ruta ${fileName}`);
        router.use(`/${fileName}`, require(`./${file}`));
    }
});


module.exports = router;