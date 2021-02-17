const { Subject, Listener, CustomError, Constants: { HTTP_CODE } } = require('@tiotix/common');

const movieService = require('./../../services/movie.service');
const { API_ACTION } = require('./../../configs/api-action');

class MovieCreatedListener extends Listener {
    subject = Subject.MovieCreated;
    queueGroupName = process.env.QUEUE_GROUP_NAME;

    onMessage = async (data, msg) => {
        console.log("Data received: ", data);

        // Add new movie
        await movieService.spAddMovie(data);

        // Acknowledge
        msg.ack();
    }
}

class MovieUpdatedListener extends Listener {
    subject = Subject.MovieUpdated;
    queueGroupName = process.env.QUEUE_GROUP_NAME;

    onMessage = async (data, msg) => {
        console.log("Data received: ", data);

        // Update movie
        const result = await movieService.spUpdateMovie(data);
        if (result[0]) {
            const { statusCode } = result[0]["0"];
            switch (statusCode) {
                case 0: {
                    // Acknowledge
                    msg.ack();
                    break;
                }
                case -1: {
                    throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} invalid ID`);
                }
                case -2: {
                    throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} invalid version`);
                }
                case -99: {
                    throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} DB internal error`);
                }
                default:
                    throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} DB status code unknown`);
            }
        }
        else {
            throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} DB response error`);
        }
    }
}

class MovieDeletedListener extends Listener {
    subject = Subject.MovieDeleted;
    queueGroupName = process.env.QUEUE_GROUP_NAME;

    onMessage = async (data, msg) => {
        console.log("Data received: ", data);

        // Delete movie
        const result = await movieService.spDeleteMovie(data);
        if (result[0]) {
            const { statusCode } = result[0]["0"];
            switch (statusCode) {
                case 0: {
                    // Acknowledge
                    msg.ack();
                    break;
                }
                case -1: {
                    throw new CustomError(HTTP_CODE.BAD_REQUEST, `${API_ACTION.UPDATE_MOVIE} invalid ID`);
                }
                case -2: {
                    throw new CustomError(HTTP_CODE.BAD_REQUEST, `${API_ACTION.UPDATE_MOVIE} invalid version`);
                }
                case -99: {
                    throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} DB internal error`);
                }
                default:
                    throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} DB status code unknown`);
            }
        }
        else {
            throw new CustomError(HTTP_CODE.INTERNAL_ERROR, `${API_ACTION.UPDATE_MOVIE} DB response error`);
        }
    }
}

module.exports = {
    MovieCreatedListener,
    MovieUpdatedListener,
    MovieDeletedListener
}

