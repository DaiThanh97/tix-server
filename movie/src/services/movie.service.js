const { QueryTypes } = require('sequelize');

const db = require('./../configs/database');

exports.spGetMovies = () => {
    return db.query('CALL GET_MOVIES()',
        {
            type: QueryTypes.SELECT
        });
}
