const { QueryTypes } = require('sequelize');

const db = require('../configs/database');

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