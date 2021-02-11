require('dotenv').config();
const express = require('express');
const { errorHandler } = require('@tiotix/common');

const movieRoute = require('./routes/movie.route');

const app = express();

app.use(express.json());

app.use('/api/movie', movieRoute);

app.use(errorHandler);

module.exports = app;