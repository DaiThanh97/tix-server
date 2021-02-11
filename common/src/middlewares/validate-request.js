const { validationResult } = require('express-validator');

const CustomError = require('./../classes/CustomError');
const { STATUS_CODE } = require('./../constants');

module.exports = (req, res, next) => {
    let { errors } = validationResult(req);
    if (errors.length > 0) {
        errors = errors.map(err => ({ msg: err.msg, field: err.param }))
        const customError = new CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid request', errors);
        return next(customError);
    }
    next();
}