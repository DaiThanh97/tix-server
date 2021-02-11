const { check } = require('express-validator');

const validate = {
    signUp: [
        check('username')
            .isLength({ min: 6, max: 15 }).withMessage('Username must between 6 and 15 characters')
            .isAlphanumeric().withMessage('Username must not have a speacial character')
            .trim(),
        check('password')
            .isLength({ min: 6, max: 15 }).withMessage('Password must between 6 and 15 characters')
            .trim(),
        check('email')
            .isEmail().withMessage('Email must be valid')
            .normalizeEmail()
            .trim(),
        check('phone')
            .isLength({ max: 20 }).withMessage('Phone must less than 20 characters')
            .isMobilePhone("vi-VN").withMessage('Phone is not valid'),
        check('fullName')
            .isLength({ max: 50 }).withMessage('Name must less than 50 characters')
            .notEmpty().withMessage('Fullname is required')
            .trim()
            .escape()
    ],
    logIn: [
        check('username')
            .isLength({ min: 6, max: 15 }).withMessage('Username must between 6 and 15 characters')
            .isAlphanumeric().withMessage('Username must not have a speacial character')
            .trim(),
        check('password')
            .isLength({ min: 6, max: 15 }).withMessage('Password must between 6 and 15 characters')
            .trim(),
    ],
}

module.exports = validate;