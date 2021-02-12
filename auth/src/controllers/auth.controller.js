const {
    asyncHandler,
    Response,
    CustomError,
    Constants: { HTTP_CODE }
} = require('@tiotix/common');

const jwtService = require('./../services/jwt.service');
const authService = require('./../services/auth.service');

// @DESC    SIGN UP USER
// @ROUTE   /api/auth/signUp
// @ACCESS  PUBLIC
exports.signUp = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    // Call SP
    const result = await authService.spAccountSignUp(req.body);
    // Check response DB
    if (result[0]) {
        const { statusCode, ...data } = result[0]["0"];
        switch (statusCode) {
            case 0: {
                httpCode = HTTP_CODE.CREATED;
                data.token = jwtService.sign({ id: data.id });
                response = new Response('Sign up successful', data);
                break;
            }
            case -1: {
                throw new CustomError(httpCode, 'Username is already in use');
            }
            case -2: {
                throw new CustomError(httpCode, 'Email is already in use');
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

// @DESC    LOGIN USER
// @ROUTE   /api/auth/logIn
// @ACCESS  PUBLIC
exports.logIn = asyncHandler(async (req, res, next) => {
    let response;
    let httpCode = HTTP_CODE.BAD_REQUEST;
    // Call SP
    const result = await authService.spAccountLogin(req.body);
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