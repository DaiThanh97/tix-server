const { QueryTypes } = require('sequelize');

const db = require('../configs/database');

// ADMIN CINEMA
exports.spAdminAddCinema = ({ name, slug, logo, createdBy, subject, data }) => {
    return db.query('CALL ADMIN_CINEMA_ADD(:p_name, :p_slug, :p_logo, :p_created_by, :p_subject, :p_data)',
        {
            replacements: {
                p_name: name,
                p_slug: slug,
                p_logo: logo,
                p_created_by: createdBy,
                p_subject: subject,
                p_data: data,
            },
            type: QueryTypes.UPDATE
        });
}
