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
    '/addMovie',
    requireAuth,
    validate.addMovie,
    validateRequest,
    adminController.addMovie
);

module.exports = router;