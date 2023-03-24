const { tracksModel } = require('../models/index');

/**
 * Metodo usado para obtener todos los elementos que se hallen en la base de datos de la tabla tracks
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getItems = async (req, res) => {
    const data = await tracksModel.find({});

    res.status(200).send({ data: data });
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
    const { body } = req;
    let tracksArray = await tracksModel.find({ name: body.name });
    let response = {};
    
    response = tracksArray.length ? { status: 'Error', message: 'The information of the track already exists.', code: 400 }
        : { data: await tracksModel.create(body), message: 'The track has been saved successfully.', status: 'Success', code: 200 };

    res.status(response.code).send({ ...response });
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