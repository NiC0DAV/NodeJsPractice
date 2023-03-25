const { matchedData } = require('express-validator');
const { tracksModel } = require('../models/index');
const { handleHttpResponse } = require('../utils/handleResponse');

/**
 * Metodo usado para obtener todos los elementos que se hallen en la base de datos de la tabla tracks
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getItems = async (req, res) => {
    let response;
    try {
        const data = await tracksModel.find({});
        
        response = {
            message: 'Data obtained successfully.',
            code: 200,
            data: data
        }
        handleHttpResponse(res, response);
    } catch (error) {
        response = {
            message: 'Something went wrong while we were obtaining the data.',
            code: 503
        }
        handleHttpResponse(res, response);
    }
}

/**
 * Obtiene un elemento en especifico que se halle en la base de datos en la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    //
}

/**
 * Inserta un elemento en la base de datos sobre la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const body = matchedData(req);
    let response = {};

    try {
        let tracksArray = await tracksModel.find({ name: body.name });
    
        response = tracksArray.length ? {
            code: 400,
            status: 'Error',
            message: 'The information of the track already exists.'
        } : {
            code: 200,
            status: 'Success',
            message: 'The track has been saved successfully.',
            data: await tracksModel.create(body)
        };
        
        handleHttpResponse(res, ...response);
    } catch (error) {
        response = {
            message: 'Something went wrong registrating the data.',
            code: 503
        }
        handleHttpResponse(res, response);
    }
}

/**
 * Actualiza un elemento de la base de datos en la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    //
}

/**
 * Elimina un elemento de la base de datos en la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    //
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem }