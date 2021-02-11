const { check } = require('express-validator');

const validate = {
    logIn: [
        check('username')
            .isLength({ min: 6, max: 15 }).withMessage('Username must between 6 and 15 characters')
            .isAlphanumeric().withMessage('Username must not have a speacial character')
            .trim(),
        check('password')
            .isLength({ min: 6, max: 15 }).withMessage('Password must between 6 and 15 characters')
            .trim(),
    ],
    addMovie: [
        check('name')
            .isLength({ min: 1, max: 50 }).withMessage('Movie name must less than 50 characters')
            .trim(),
        check('trailer')
            .notEmpty().withMessage('Trailer is required')
            .trim(),
        check('photo')
            .notEmpty().withMessage('Photo is required')
            .trim(),
        check('content')
            .isLength({ min: 1, max: 255 }).withMessage('Content must less than 255 characters')
            .trim(),
        check('publishDate')
            .isDate({ format: 'YYYY-MM-DD' }).withMessage('Publish date format is invalid')
            .trim(),
        check('totalTime')
            .isNumeric().withMessage('Total time must be a number'),
        check('status')
            .isNumeric().withMessage("Status is invalid"),
        check('popular')
            .isNumeric().withMessage("Popular is invalid"),
    ]
}

module.exports = validate;