const express = require('express');
const { errorHandler } = require('@tiotix/common');

const authRoute = require('./routes/auth.route');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoute);

app.use(errorHandler);

module.exports = app;