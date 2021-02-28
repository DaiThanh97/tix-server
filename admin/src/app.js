const express = require('express');
const { errorHandler } = require('@tiotix/common');

const adminRoute = require('./routes');

const app = express();

app.use(express.json());

// Routes
const ROUTE = process.env.ROUTE_PREFIX + process.env.ROUTE_ADMIN;
app.use(ROUTE, adminRoute);

app.use(errorHandler);

module.exports = app;