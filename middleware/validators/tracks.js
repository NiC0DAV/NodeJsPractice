const { check, param } = require('express-validator');
const { validateResults } = require('../../utils/helpers');

const createItemValidation = [
    check("name").exists().notEmpty().trim().escape(),
    check("album").exists().notEmpty().trim().escape(),
    check("cover").exists().notEmpty().trim().escape(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty().trim().escape(),
    check("artist.nickname").exists().notEmpty().trim().escape(),
    check("artist.nationality").exists().notEmpty().trim().escape(),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty().isNumeric().escape(),
    check("duration.end").exists().notEmpty().isNumeric().escape(),
    check("mediaId").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

const getItemValidation = [
    param("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

const updateItemValidation = [
    check("name").exists().notEmpty().trim().escape(),
    check("album").exists().notEmpty().trim().escape(),
    check("cover").exists().notEmpty().trim().escape(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty().trim().escape(),
    check("artist.nickname").exists().notEmpty().trim().escape(),
    check("artist.nationality").exists().notEmpty().trim().escape(),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty().isNumeric().escape(),
    check("duration.end").exists().notEmpty().isNumeric().escape(),
    (req, res, next) => validateResults(req, res, next)
];

const deleteItemValidation = [
    param("id").exists().notEmpty().isMongoId().trim().escape(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { createItemValidation, getItemValidation, updateItemValidation, deleteItemValidation };