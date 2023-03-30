const { check, param } = require('express-validator');
const { validateResults } = require('../../utils/helpers');


const validatorGetItem = [
    param("id")
    .exists()
    .notEmpty()
    .isMongoId()
    .trim()
    .escape(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validatorGetItem };