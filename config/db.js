const Sequelize = require('sequelize');

process.env.DB_NAME;
process.env.DB_USER;
process.env.DB_PASS;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;