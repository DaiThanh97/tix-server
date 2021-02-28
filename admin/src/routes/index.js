const express = require('express');
const router = express.Router();

let { ROUTES } = require('../configs/routes');

ROUTES = Object.values(ROUTES);
for (let list of ROUTES) {
    for (let route of list) {
        const { method, path, middlewares } = route;
        router[method](path, middlewares);
    }
}

module.exports = router;