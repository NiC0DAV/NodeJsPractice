const handleHttpResponse = (res, { code, status = '', message, data = {} }) => {
    res.status(code).send({code, status, message, data})
}

module.exports = { handleHttpResponse };