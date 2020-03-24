const Sequelize = require('sequelize');
const config = require('config');

const DB_NAME = config.get("DB_NAME");
const DB_USER = config.get("DB_USER");
const DB_PASS = config.get("DB_PASS");


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