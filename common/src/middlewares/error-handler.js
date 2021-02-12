const { HTTP_CODE } = require("../constants");

module.exports = (err, req, res, next) => {
    const { message, errors, status } = err;
    res.status(status || HTTP_CODE.INTERNAL_ERROR)
        .json({
            message,
            errors: errors ? errors : {}
        });
}