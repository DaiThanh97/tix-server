const { QueryTypes } = require('sequelize');

const db = require('./../configs/database');

exports.spAccountSignUp = ({ username, password, fullName, phone, email }) => {
    return db.query('CALL ACCOUNT_SIGNUP(:p_username, :p_password, :p_fullName, :p_phone, :p_email)',
        {
            replacements: {
                p_username: username,
                p_password: password,
                p_fullName: fullName,
                p_phone: phone,
                p_email: email
            },
            type: QueryTypes.SELECT
        });
}

exports.spAccountLogin = ({ username, password }) => {
    return db.query('CALL ACCOUNT_LOGIN(:p_username, :p_password)',
        {
            replacements: {
                p_username: username,
                p_password: password
            },
            type: QueryTypes.SELECT
        });
}