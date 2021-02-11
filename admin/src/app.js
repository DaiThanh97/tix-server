require('dotenv').config();
const express = require('express');
const { errorHandler } = require('@tiotix/common');

const adminRoute = require('./routes/admin.route');

const app = express();

app.use(express.json());

app.use('/api/admin', adminRoute);

app.use(errorHandler);

module.exports = app;