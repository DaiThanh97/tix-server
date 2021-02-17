const express = require('express');
const router = express.Router();
const { validateRequest } = require('@tiotix/common');

const adminController = require('./../controllers/admin.controller');
const validate = require('./../validations/admin.validation');
const { requireAuth } = require('@tiotix/common');

router.post(
    '/logIn',
    validate.logIn,
    validateRequest,
    adminController.logIn
);

router.post(
    '/movie',
    requireAuth,
    validate.addMovie,
    validateRequest,
    adminController.addMovie
)

router.get(
    '/movie/upload',
    requireAuth,
    adminController.getPresignURL
)

router.route('/movie/:id')
    .put(
        requireAuth,
        validate.updateMovie,
        validateRequest,
        adminController.updateMovie
    )
    .delete(
        requireAuth,
        validate.deleteMovie,
        validateRequest,
        adminController.deleteMovie
    )

module.exports = router;