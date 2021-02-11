const { STATUS_CODE } = require("../constants");

module.exports = (err, req, res, next) => {
    const { message, errors, status } = err;
    res.status(status || STATUS_CODE.INTERNAL_ERROR)
        .json({
            message,
            errors: errors ? errors : {}
        });
}