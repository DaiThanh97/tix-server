const { body, param } = require('express-validator');

const validate = {
    logIn: [
        body('username')
            .isLength({ min: 6, max: 15 }).withMessage('Username must between 6 and 15 characters')
            .isAlphanumeric().withMessage('Username must not have a speacial character')
            .trim(),
        body('password')
            .isLength({ min: 6, max: 15 }).withMessage('Password must between 6 and 15 characters')
            .trim(),
    ]
}

module.exports = validate;