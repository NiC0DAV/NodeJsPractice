const path = require('path');
const fs = require('fs')
const { promisify } = require('util');
const { storagesModel } = require('../models/index');
const { validateMimeType } = require('../utils/helpers');
const { handleHttpResponse } = require('../utils/handleResponse');
const { matchedData } = require('express-validator');


const PUBLIC_URI = process.env.PUBLIC_URI;
const MEDIA_PATH = `${__dirname}/../storage`;
const unlinkAsync = promisify(fs.unlink);

/**
 * Metodo usado para obtener todos los elementos que se hallen en la base de datos de la tabla storage
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getItems = async (req, res) => {
    try {
        const data = await storagesModel.find({});;

        const response = {
            message: 'Data obtained successfully.',
            code: 200,
            data: data
        }
        handleHttpResponse(res, response);
    } catch (error) {
        const response = {
            message: 'Something went wrong while we were obtaining the data.',
            code: 503
        }
        handleHttpResponse(res, response);
    }
}

/**
 * Obtiene un elemento en especifico que se halle en la base de datos en la tabla storage
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);

        const response = {
            message: 'Storage element obtained successfully.',
            code: 200,
            data: await storagesModel.findById(id)
        }

        handleHttpResponse(res, response);
    } catch (error) {
        const response = {
            status: 'Error',
            message: 'Something went wrong while we were obtaining the data.',
            code: 503
        }
        handleHttpResponse(res, response);
    }
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
    try {
        const { file } = req;
        const fileData = {
          filename: file.filename,
          url: `${PUBLIC_URL}/${file.filename}`,
        };
        const data = await storageModel.create(fileData);
        res.status(201).send({ data });
    } catch (e) {        
        const response = {
            code: 500,
            message: "Something went wrong"
        }

        handleHttpError(res, response);
      }
}

/**
 * Elimina un elemento de la base de datos en la tabla storage
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storagesModel.findById(id);
        const deleteResponse = await storagesModel.delete({ _id: id });
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`; //TODO c:/miproyecto/file-1232.png
    
        // fs.unlinkSync(filePath);
        const data = {
          filePath,
          deleted: deleteResponse.matchedCount,
        };
    
        res.status(200).send({ data });
    } catch (e) {
        const response = {
            code: 500,
            message: "Something went wrong"
        }

        handleHttpResponse(res, response);
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }