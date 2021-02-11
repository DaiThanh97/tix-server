const express = require('express');
const router = express.Router();
const { validateRequest } = require('@tiotix/common');

const authController = require('./../controllers/auth.controller');
const validate = require('./../validations/auth.validation');

router.post(
    '/signUp',
    validate.signUp,
    validateRequest,
    authController.signUp
);

router.post(
    '/logIn',
    validate.logIn,
    validateRequest,
    authController.logIn
);

module.exports = router;