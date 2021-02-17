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

// ADD MOVIE
exports.spAdminAddMovie = (
    name,
    slug,
    trailer,
    photo,
    content,
    publishDate,
    totalTime,
    status,
    popular,
    subject,
    data
) => {
    return db.query(`CALL ADMIN_MOVIE_ADD(
            :p_name, 
            :p_slug, 
            :p_trailer, 
            :p_photo, 
            :p_content, 
            :p_publish_date, 
            :p_total_time, 
            :p_status, 
            :p_popular,
            :p_subject,
            :p_data
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
                p_popular: popular,
                p_subject: subject,
                p_data: JSON.stringify(data)
            },
            type: QueryTypes.SELECT
        });
}

// UPDATE MOVIE
exports.spAdminUpdatedMovie = (
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
    subject,
    data
) => {
    return db.query(`CALL ADMIN_MOVIE_UPDATE(
            :p_id,
            :p_name, 
            :p_slug, 
            :p_trailer, 
            :p_photo, 
            :p_content, 
            :p_publish_date, 
            :p_total_time, 
            :p_status, 
            :p_popular,
            :p_subject,
            :p_data
        )`,
        {
            replacements: {
                p_id: id,
                p_name: name,
                p_slug: slug,
                p_trailer: trailer,
                p_photo: photo,
                p_content: content,
                p_publish_date: publishDate,
                p_total_time: totalTime,
                p_status: status,
                p_popular: popular,
                p_subject: subject,
                p_data: JSON.stringify(data)
            },
            type: QueryTypes.SELECT
        });
}

// DELETE MOVIE
exports.spAdminDeleteMovie = (id, subject, data) => {
    return db.query('CALL ADMIN_MOVIE_DELETE(:p_id, :p_subject, :p_data)',
        {
            replacements: {
                p_id: id,
                p_subject: subject,
                p_data: JSON.stringify(data)
            },
            type: QueryTypes.SELECT
        });
}

// UPDATE EVENT
exports.spAdminUpdateEvent = (id) => {
    return db.query('CALL ADMIN_EVENT_UPDATE(:p_id)',
        {
            replacements: {
                p_id: id
            },
            type: QueryTypes.UPDATE
        });
}

// GET EVENT
exports.spAdminGetEvent = () => {
    return db.query('CALL ADMIN_EVENT_GET()',
        {
            type: QueryTypes.SELECT
        });
}