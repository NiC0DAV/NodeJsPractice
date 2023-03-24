'use strict'
/**
* Importacion e instanciamiento de dependencias para desarrollo del proyectos
*/
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const app = express();

/**
* Especificacion de puerto proveniente de archivo .env para levantar el HostLocal y abrir el servicio API
*/
const port = process.env.PORT || 3000;

/**
* Ruta api llama a todas los conjuntos de rutas de la carpeta routes que importa el archivo index.js
*/
app.use("/api", require("./routes"));


app.use(cors());

/**
* Llamado de funcion dbConnect() que se halla en config/mongo.js para generar conexion a la Base de Datos.
*/
dbConnect();

/**
* Inicializacion de servicio API con express
*/
app.listen(port, () => { console.log(`Tu app esta lista por http://localhost:${port}`) });
