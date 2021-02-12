const jwt = require('jsonwebtoken');

const { HTTP_CODE } = require('../constants');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.JWT_KEY);
        if (!payload) {
            throw new Error();
        }

        req.user = payload;
        next();
    } catch (err) {
        err.httpCode = HTTP_CODE.UNAUTHENTICATED;
        err.message = 'Not authenticated!';
        next(err);
    }
}