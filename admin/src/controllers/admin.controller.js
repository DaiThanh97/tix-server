const {
    asyncHandler,
    Response,
    CustomError,
    Constants: { STATUS_CODE }
} = require('@tiotix/common');
const slugify = require('slugify');

const jwtService = require('./../services/jwt.service');
const adminService = require('./../services/admin.service');
const { MovieCreatedPublisher } = require('./../events/publisher/movie.publisher');
const natsWrapper = require('./../nats-wrapper');

// @DESC    LOGIN ADMIN
// @ROUTE   /api/admin/logIn
// @ACCESS  PUBLIC
exports.logIn = asyncHandler(async (req, res, next) => {
    let response;
    let status = STATUS_CODE.BAD_REQUEST;
    // Call SP
    const result = await adminService.spAdminLogin(req.body);
    // Check response DB
    if (result[0]) {
        const { statusCode, ...data } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                status = STATUS_CODE.SUCCESS;
                data.token = jwtService.sign({ id: data.id });
                response = new Response('Log in successful', data);
                break;
            }
            case -1:
            case -2: {
                throw new CustomError(status, 'Invalid credentials');
            }
            default:
                throw new CustomError(STATUS_CODE.INTERNAL_ERROR, 'DB status unknown');
        }
    }
    else {
        throw new CustomError(STATUS_CODE.INTERNAL_ERROR, 'DB response error');
    }

    // Response
    res.status(status)
        .json(response);
});

// @DESC    ADD MOVIE
// @ROUTE   /api/admin/addMovie
// @ACCESS  PRIVATE
exports.addMovie = asyncHandler(async (req, res, next) => {
    let response;
    let status = STATUS_CODE.BAD_REQUEST;
    const slug = slugify(req.body.name, { lower: true, locale: 'vi' });

    // Call SP
    const result = await adminService.spAdminAddMovie({ ...req.body, slug });
    // Check response DB
    if (result[0]) {
        const { statusCode } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                status = STATUS_CODE.SUCCESS;
                response = new Response('Add movie successful');
                break;
            }
            case -1: {
                throw new CustomError(status, 'Invalid status');
            }
            case -2: {
                throw new CustomError(status, 'Invalid popular');
            }
            case -3: {
                throw new CustomError(STATUS_CODE.INTERNAL_ERROR, 'Db unable to add new movie');
            }
            default:
                throw new CustomError(STATUS_CODE.INTERNAL_ERROR, 'DB status unknown');
        }
    }
    else {
        throw new CustomError(STATUS_CODE.INTERNAL_ERROR, 'DB response error');
    }

    // Publish event to NATS
    await new MovieCreatedPublisher(natsWrapper.getClient()).publish({
        ...req.body,
        slug
    });

    // Response
    res.status(status)
        .json(response);
});