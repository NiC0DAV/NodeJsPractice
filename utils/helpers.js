const { validationResult } = require('express-validator');

const validateMimeType = async (file, mimeTypes) => {
    let checkMime = false;

    if (file) {
        checkMime = mimeTypes.includes(file.mimetype);
    }

    return checkMime;
}

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403).send({ error: error.array() });
    }
}

module.exports = { validateMimeType, validateResults };