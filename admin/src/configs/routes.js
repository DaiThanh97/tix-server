const {
    validateRequest,
    requireAuth,
    Constants: { METHOD }
} = require('@tiotix/common');

const validateAdmin = require('./../validations/admin.validation');
const validateMovie = require('./../validations/movie.validation');
const adminController = require('../controllers/admin.controller');
const movieController = require('../controllers/movie.controller');

const MOVIE_PREFIX = "/movie";

// ROUTES
exports.ROUTES = {
    ADMIN: [
        {
            method: METHOD.POST,
            path: '/logIn',
            middlewares: [
                requireAuth,
                validateAdmin.logIn,
                validateRequest,
                adminController.logIn
            ]
        }
    ],
    MOVIE: [
        {
            method: METHOD.POST,
            path: MOVIE_PREFIX,
            middlewares: [
                requireAuth,
                validateMovie.addMovie,
                movieController.addMovie
            ]
        },
        {
            method: METHOD.GET,
            path: MOVIE_PREFIX,
            middlewares: [
                movieController.getMovies
            ]
        },
        {
            method: METHOD.GET,
            path: `${MOVIE_PREFIX}/upload`,
            middlewares: [
                requireAuth,
                movieController.getPresignURL
            ]
        },
        {
            method: METHOD.PUT,
            path: `${MOVIE_PREFIX}/:id`,
            middlewares: [
                requireAuth,
                validateMovie.updateMovie,
                movieController.updateMovie
            ]
        },
        {
            method: METHOD.DELETE,
            path: `${MOVIE_PREFIX}/:id`,
            middlewares: [
                requireAuth,
                validateMovie.deleteMovie,
                movieController.deleteMovie
            ]
        }
    ]
};