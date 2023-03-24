'use strict'
/**
* Importacion e instanciamiento de dependencias para desarrollo del proyectos
*/
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const bodyParser = require('body-parser');
const app = express();

/**
* Especificacion de puerto proveniente de archivo .env para levantar el HostLocal y abrir el servicio API
*/
const port = process.env.PORT || 3000;

/**
* Se le aclara a nuestro servicio que estara recibiendo informacion en formato json para que entonces la parsee.
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

/**
* Ruta api llama a todas los conjuntos de rutas de la carpeta routes que importa el archivo index.js
*/
app.use("/api", require("./routes"));

/**
* Inicializacion de servicio API con express
*/
app.listen(port, () => { console.log(`Tu app esta lista por http://localhost:${port}`) });

/**
* Llamado de funcion dbConnect() que se halla en config/mongo.js para generar conexion a la Base de Datos.
*/
dbConnect();
