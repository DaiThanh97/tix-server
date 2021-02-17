const { QueryTypes } = require('sequelize');

const db = require('./../configs/database');

exports.spGetMovies = () => {
    return db.query('CALL MOVIE_GET_ALL()',
        {
            type: QueryTypes.SELECT
        });
}

exports.spAddMovie = ({
    name,
    slug,
    trailer,
    photo,
    content,
    publishDate,
    totalTime,
    status,
    popular
}) => {
    return db.query(`CALL MOVIE_ADD(
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
            type: QueryTypes.UPDATE
        });
}

exports.spUpdateMovie = ({
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
    version
}) => {
    return db.query(`CALL MOVIE_UPDATE(
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
            :p_version
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
                p_version: version
            },
            type: QueryTypes.SELECT
        });
}

exports.spDeleteMovie = ({ id, version }) => {
    return db.query('CALL MOVIE_DELETE(:p_id, :p_version)',
        {
            replacements: {
                p_id: id,
                p_version: version
            },
            type: QueryTypes.SELECT
        });
}