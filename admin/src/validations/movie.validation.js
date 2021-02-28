const { body, param } = require('express-validator');

const validate = {
    addMovie: [
        body('name')
            .isLength({ min: 1, max: 50 }).withMessage('Movie name must less than 50 characters')
            .trim(),
        body('trailer')
            .notEmpty().withMessage('Trailer is required')
            .trim(),
        body('photo')
            .notEmpty().withMessage('Photo is required')
            .trim(),
        body('content')
            .isLength({ min: 1, max: 255 }).withMessage('Content must less than 255 characters')
            .trim(),
        body('publishDate')
            .isDate({ format: 'YYYY-MM-DD' }).withMessage('Publish date format is invalid')
            .trim(),
        body('totalTime')
            .isNumeric().withMessage('Total time must be a number'),
        body('status')
            .notEmpty().withMessage("Status is invalid"),
        body('popular')
            .notEmpty().withMessage("Popular is invalid"),
    ],
    updateMovie: [
        param('id')
            .isNumeric().withMessage('ID is invalid'),
        body('name')
            .isLength({ min: 1, max: 50 }).withMessage('Movie name must less than 50 characters')
            .trim(),
        body('trailer')
            .notEmpty().withMessage('Trailer is required')
            .trim(),
        body('photo')
            .notEmpty().withMessage('Photo is required')
            .trim(),
        body('content')
            .isLength({ min: 1, max: 255 }).withMessage('Content must less than 255 characters')
            .trim(),
        body('publishDate')
            .isDate({ format: 'YYYY-MM-DD' }).withMessage('Publish date format is invalid')
            .trim(),
        body('totalTime')
            .isNumeric().withMessage('Total time must be a number'),
        body('status')
            .notEmpty().withMessage("Status is invalid"),
        body('popular')
            .notEmpty().withMessage("Popular is invalid"),
    ],
    deleteMovie: [
        param('id')
            .isNumeric().withMessage('ID is invalid'),
    ]
}

module.exports = validate;