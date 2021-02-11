const jwt = require('jsonwebtoken');

exports.sign = payload => {
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES });
};