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
    try {
        const data = await tracksModel.find({});

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
 * Obtiene un elemento en especifico que se halle en la base de datos en la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);

        const response = {
            message: 'Track obtained successfully.',
            code: 200,
            data: await tracksModel.findById(id)
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
 * Inserta un elemento en la base de datos sobre la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        let tracksArray = await tracksModel.find({ name: body.name });

        const response = tracksArray.length ? {
            code: 400,
            status: 'Error',
            message: 'The information of the track already exists.'
        } : {
            code: 200,
            status: 'Success',
            message: 'The track has been saved successfully.',
            data: await tracksModel.create(body)
        };

        handleHttpResponse(res, response);
    } catch (error) {
        const response = {
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
    try {
        const body = matchedData(req);
        const tracks = await tracksModel.findOne({ name: body.name });

        if (!tracks) {
            const { id, ...body } = matchedData(req);
            console.log(body);
            const response = {
                code: 200,
                status: 'Success',
                message: 'The track has been saved successfully.',
                data: await tracksModel.findOneAndUpdate(body.id, body)
            }

            handleHttpResponse(res, response);
        } else {
            const response = {
                code: 400,
                status: 'Error',
                message: 'The information of the track already exists.'
            }
            handleHttpResponse(res, response);
        }

    } catch (error) {
        const response = {
            message: 'Something went wrong registrating the data.',
            code: 503
        }
        handleHttpResponse(res, response);
    }
}

/**
 * Elimina un elemento de la base de datos en la tabla tracks
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);

        console.log(id);
        const response = {
            message: 'Track deleted successfully.',
            code: 200,
            data: await tracksModel.delete({_id: id})
        }

        handleHttpResponse(res, response);
    } catch (error) {
        const response = {
            status: 'Error',
            message: 'Something went wrong while we were deleting the data.',
            code: 503
        }
        handleHttpResponse(res, response);
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }