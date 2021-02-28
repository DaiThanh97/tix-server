const {
    asyncHandler,
    Response,
    CustomError,
    Constants: { HTTP_CODE }
} = require('@tiotix/common');

const jwtService = require('./../services/jwt.service');
const adminService = require('./../services/admin.service');
const { API_ACTION } = require('./../configs/api-action');

// @DESC    LOGIN ADMIN
// @ROUTE   POST /api/admin/logIn
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
                throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_LOGIN} DB status unknown`);
        }
    }
    else {
        throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.ADMIN_LOGIN} DB response error`);
    }

    // Response
    res.status(httpCode)
        .json(response);
});