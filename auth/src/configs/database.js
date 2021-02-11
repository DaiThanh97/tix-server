const { Sequelize } = require('sequelize');

const db = new Sequelize(`${process.env.MYSQL_URL}/${process.env.DB_NAME}`);

module.exports = db;