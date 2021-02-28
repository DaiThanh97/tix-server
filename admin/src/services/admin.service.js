const { QueryTypes } = require('sequelize');

const db = require('../configs/database');

// LOGIN ADMIN
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