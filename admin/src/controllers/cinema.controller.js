const {
    asyncHandler,
    Response,
    CustomError,
    Subject,
    Constants: { HTTP_CODE }
} = require('@tiotix/common');

const cinemaService = require('./../services/cinema.service');

// @DESC    GET ALL CINEMA
// @ROUTE   GET /api/admin/cinema
// @ACCESS  PUBLIC
exports.getCinemas = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;

    // Call SP
    const result = await cinemaService.spAdminAddCinema();

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