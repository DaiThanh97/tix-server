const {
    asyncHandler,
    Response,
    CustomError,
    Constants: { HTTP_CODE }
} = require('@tiotix/common');

const movieService = require('./../services/movie.service');

// @DESC    GET LIST MOVIE
// @ROUTE   /api/movie/getMovies
// @ACCESS  PUBLIC
exports.getMovies = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    // Call SP
    const result = await movieService.spGetMovies();
    // Check response DB
    if (result[0]) {
        const data = Object.values(result[0]);
        httpCode = HTTP_CODE.CREATED;
        response = new Response('Get movies successful', data);
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, 'DB response error');
    }

    // Response
    res.status(httpCode)
        .json(response);
});