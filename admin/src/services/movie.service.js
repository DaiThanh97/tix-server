const { QueryTypes } = require('sequelize');

const db = require('../configs/database');

// GET MOVIES
exports.spAdminGetAllMovie = () => {
    return db.query('CALL ADMIN_MOVIE_GET_ALL()',
        {
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
    createdBy,
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
            :p_created_by,
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
                p_created_by: createdBy,
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
