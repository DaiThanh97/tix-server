class CustomError extends Error {
    constructor(httpCode, message, errors = {}) {
        super(message);
        this.httpCode = httpCode;
        this.errors = errors;
    }
}

module.exports = CustomError;