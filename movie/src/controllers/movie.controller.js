const {
    asyncHandler,
    Response,
    CustomError,
    Constants: { STATUS_CODE }
} = require('@tiotix/common');

const movieService = require('./../services/movie.service');

// @DESC    GET LIST MOVIE
// @ROUTE   /api/movie/getMovies
// @ACCESS  PUBLIC
exports.getMovies = asyncHandler(async (req, res, next) => {
    let response;
    let status = STATUS_CODE.BAD_REQUEST;
    // Call SP
    const result = await movieService.spGetMovies();
    // Check response DB
    if (result[0]) {
        const data = Object.values(result[0]);
        status = STATUS_CODE.CREATED;
        response = new Response('Get movies successful', data);
    }
    else {
        throw new CustomError(STATUS_CODE.INTERNAL_ERROR, 'DB response error');
    }

    // Response
    res.status(status)
        .json(response);
});