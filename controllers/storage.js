const path = require('path');
const fs = require('fs')
const { promisify } = require('util');
const { storagesModel } = require('../models/index');
const { validateMimeType } = require('../utils/helpers');

const PUBLIC_URI = process.env.PUBLIC_URI;
const unlinkAsync = promisify(fs.unlink);

/**
 * Metodo usado para obtener todos los elementos que se hallen en la base de datos de la tabla storage
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getItems = async (req, res) => {
    const data = await storagesModel.find({});

    res.status(200).send({ data: data });
}

/**
 * Obtiene un elemento en especifico que se halle en la base de datos en la tabla storage
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    //
}

/**
 * Inserta un elemento en la base de datos sobre la tabla storage
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const { file } = req;
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'audio/mpeg', 'audio/mp3', 'audio/mp3'];
    const isValidMimeType = await validateMimeType(file, allowedMimeTypes);
    const unlinkAsync = promisify(fs.unlink);
    let response = {};


    if (isValidMimeType) {
        response = {
            code: 200,
            status: "Success",
            message: "File uploaded succesfully",
            data: await storagesModel.create({
            filename: file.filename,
            url: path.join(PUBLIC_URI, file.filename)
            })
        }
    } else {
        const delFile = file ? await unlinkAsync(`storage/${file.filename}`) : "There's no file on the request.";

        response = {
            code: 400,
            status: 'Error',
            message: !delFile ? 'The file type you are trying to upload is not allowed.' : delFile,
            allowedMimeTypes: allowedMimeTypes.map(mimetype => mimetype.split('/').pop())
        }
    }


    res.status(response.code).send({ ...response });
}

/**
 * Actualiza un elemento de la base de datos en la tabla storage
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    //
}

/**
 * Elimina un elemento de la base de datos en la tabla storage
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    //
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }