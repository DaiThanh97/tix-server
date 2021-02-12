const {
    asyncHandler,
    Response,
    CustomError,
    Subject,
    Constants: { HTTP_CODE }
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
    let httpCode = HTTP_CODE.BAD_REQUEST;
    // Call SP
    const result = await adminService.spAdminLogin(req.body);
    // Check response DB
    if (result[0]) {
        const { statusCode, ...data } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                httpCode = HTTP_CODE.SUCCESS;
                data.token = jwtService.sign({ id: data.id });
                response = new Response('Log in successful', data);
                break;
            }
            case -1:
            case -2: {
                throw new CustomError(httpCode, 'Invalid credentials');
            }
            default:
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, 'DB status unknown');
        }
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, 'DB response error');
    }

    // Response
    res.status(httpCode)
        .json(response);
});

// @DESC    ADD MOVIE
// @ROUTE   /api/admin/addMovie
// @ACCESS  PRIVATE
exports.addMovie = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    const { name, trailer, photo, content, publishDate, totalTime, status, popular } = req.body;
    const slug = slugify(name, { lower: true, locale: 'vi' });
    const dataPublish = { ...req.body, slug };

    // Call SP
    const result = await adminService.spAdminAddMovie(
        name,
        slug,
        trailer,
        photo,
        content,
        publishDate,
        totalTime,
        status,
        popular,
        Subject.MovieCreated,
        dataPublish
    );

    // Check response DB
    if (result[0]) {
        const { statusCode, idEvent } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                httpCode = HTTP_CODE.SUCCESS;
                response = new Response('Add movie successful');
                // Publish event to NATS
                await new MovieCreatedPublisher(natsWrapper.getClient()).publish(dataPublish);
                // Update event published
                adminService.spAdminUpdateEvent(idEvent);
                break;
            }
            case -1: {
                throw new CustomError(httpCode, 'Invalid status');
            }
            case -2: {
                throw new CustomError(httpCode, 'Invalid popular');
            }
            case -3: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, 'Db unable to add new movie');
            }
            default:
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, 'DB status code unknown');
        }
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, 'DB response error');
    }

    // Response
    res.status(httpCode)
        .json(response);
});