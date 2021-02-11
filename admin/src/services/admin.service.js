const { QueryTypes } = require('sequelize');

const db = require('../configs/database');

exports.spAdminLogin = ({ username, password }) => {
    return db.query('CALL ADMIN_LOGIN(:p_username, :p_password)',
        {
            replacements: {
                p_username: username,
                p_password: password
            },
            type: QueryTypes.SELECT
        });
}

exports.spAdminAddMovie = ({ name, slug, trailer, photo, content, publishDate, totalTime, status, popular }) => {
    return db.query(`CALL ADMIN_ADD_MOVIE(
            :p_name, 
            :p_slug, 
            :p_trailer, 
            :p_photo, 
            :p_content, 
            :p_publish_date, 
            :p_total_time, 
            :p_status, 
            :p_popular
        )`,
        {
            replacements: {
                p_name: name,
                p_slug: slug,
                p_trailer: trailer,
                p_photo: photo,
                p_content: content,
                p_publish_date: publishDate,
                p_total_time: totalTime,
                p_status: status,
                p_popular: popular
            },
            type: QueryTypes.SELECT
        });
}
