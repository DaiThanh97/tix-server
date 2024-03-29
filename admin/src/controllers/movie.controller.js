const {
    asyncHandler,
    Response,
    CustomError,
    Subject,
    Constants: { HTTP_CODE }
} = require('@tiotix/common');
const slugify = require('slugify');
const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const {
    MovieCreatedPublisher,
    MovieUpdatedPublisher,
    MovieDeletedPublisher
} = require('./../events/publisher/movie.publisher');
const movieService = require('./../services/movie.service');
const eventService = require('./../services/event.service');
const { API_ACTION } = require('./../configs/api-action');
const natsWrapper = require('./../nats-wrapper');

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    },
    region: process.env.S3_REGION
});

// @DESC    GET ALL MOVIE
// @ROUTE   GET /api/admin/movie
// @ACCESS  PUBLIC
exports.getMovies = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;

    // Call SP
    const result = await movieService.spAdminGetAllMovie();

    // Check response DB
    if (result[0]) {
        const data = Object.values(result[0]);
        httpCode = HTTP_CODE.SUCCESS;
        response = new Response(`${API_ACTION.ADMIN_GET_MOVIES} successful`, data);
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_GET_MOVIES} DB response error`);
    }

    // Response
    res.status(httpCode)
        .json(response);
});

// @DESC    ADD MOVIE
// @ROUTE   POST /api/admin/movie
// @ACCESS  PRIVATE
exports.addMovie = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    const { name, trailer, photo, content, publishDate, totalTime, status, popular } = req.body;
    const slug = slugify(name, { lower: true, locale: 'vi' });
    const dataPublish = { ...req.body, slug };

    // Call SP
    const result = await movieService.spAdminAddMovie(
        name,
        slug,
        trailer,
        photo,
        content,
        publishDate,
        totalTime,
        status,
        popular,
        req.user.id,
        Subject.MovieCreated,
        dataPublish
    );

    // Check response DB
    if (result[0]) {
        const { statusCode, idEvent } = result[0]['0'];
        switch (statusCode) {
            case 0: {
                httpCode = HTTP_CODE.SUCCESS;
                response = new Response('Add movie successful');
                // Publish event to NATS
                await new MovieCreatedPublisher(natsWrapper.getClient()).publish(dataPublish);
                // Update event published
                eventService.spAdminUpdateEvent(idEvent);
                break;
            }
            case -1: {
                throw new CustomError(httpCode, 'Invalid status');
            }
            case -2: {
                throw new CustomError(httpCode, 'Invalid popular');
            }
            case -3: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_ADD} DB unable to add new movie`);
            }
            case -4: {
                throw new CustomError(HTTP_CODE.BAD_REQUEST, `${API_ACTION.ADMIN_MOVIE_ADD} unknown admin`);
            }
            case -99: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_ADD} DB internal error`);
            }
            default:
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_ADD} DB status code unknown`);
        }
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_ADD} DB response error`);
    }

    // Response
    res.status(httpCode)
        .json(response);
});

// @DESC    UPDATE MOVIE
// @ROUTE   PUT /api/admin/movie/:id
// @ACCESS  PRIVATE
exports.updateMovie = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    const { id } = req.params;
    const { name, trailer, photo, content, publishDate, totalTime, status, popular } = req.body;
    const slug = slugify(name, { lower: true, locale: 'vi' });
    const dataPublish = { id, ...req.body, slug };

    // Call SP
    const result = await movieService.spAdminUpdatedMovie(
        id,
        name,
        slug,
        trailer,
        photo,
        content,
        publishDate,
        totalTime,
        status,
        popular,
        Subject.MovieUpdated,
        dataPublish
    );

    // Check response DB
    if (result[0]) {
        const { statusCode, idEvent, version } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                httpCode = HTTP_CODE.SUCCESS;
                response = new Response('Update movie successful');
                // Publish event to NATS
                await new MovieUpdatedPublisher(natsWrapper.getClient()).publish({ ...dataPublish, version });
                // Update event published
                eventService.spAdminUpdateEvent(idEvent);
                break;
            }
            case -1: {
                throw new CustomError(httpCode, 'Invalid ID');
            }
            case -2: {
                throw new CustomError(httpCode, 'Invalid status');
            }
            case -3: {
                throw new CustomError(httpCode, 'Invalid popular');
            }
            case -4: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_UPDATE} DB unable to update movie`);
            }
            case -99: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_UPDATE} DB internal error`);
            }
            default:
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_UPDATE} DB status code unknown`);
        }
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_UPDATE} DB response error`);
    }

    // Response
    res.status(httpCode)
        .json(response);
});

// @DESC    DELETE MOVIE
// @ROUTE   DELETE /api/admin/movie/:id
// @ACCESS  PRIVATE
exports.deleteMovie = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    const { id } = req.params;

    // Call SP
    const result = await movieService.spAdminDeleteMovie(id, Subject.MovieDeleted, { id });

    // Check response DB
    if (result[0]) {
        const { statusCode, idEvent, version } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                httpCode = HTTP_CODE.SUCCESS;
                response = new Response('Delete movie successful');
                // Publish event to NATS
                await new MovieDeletedPublisher(natsWrapper.getClient()).publish({ id, version });
                // Update event published
                eventService.spAdminUpdateEvent(idEvent);
                break;
            }
            case -1: {
                throw new CustomError(httpCode, 'Invalid ID');
            }
            case -2: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_DELETE} DB unable to delete movie`);
            }
            case -99: {
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_DELETE} DB internal error`);
            }
            default:
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_DELETE} DB status code unknown`);
        }
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_MOVIE_DELETE} DB response error`);
    }

    // Response
    res.status(httpCode)
        .json(response);
});

// @DESC    PRESIGN URL
// @ROUTE   GET /api/admin/movie/upload?slug=batman&fileType=png
// @ACCESS  PRIVATE
exports.getPresignURL = (req, res, next) => {
    const { slug, type } = req.query;
    if (type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
        throw new CustomError(HTTP_CODE.BAD_REQUEST, 'File type is not valid');
    }

    const tail = type.replace('image/', '');
    const key = `${slug}/${v4()}.${tail}`;

    s3.getSignedUrl('putObject', {
        Bucket: process.env.S3_BUCKET_NAME,
        ContentType: type,
        Key: key,
    }, (err, url) => {
        if (err) {
            throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `Get presign url failed`);
        }
        res.status(HTTP_CODE.SUCCESS).json(new Response('Success', { key, url }));
    });
};