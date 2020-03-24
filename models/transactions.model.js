const Sequelize = require('sequelize');
const db = require('../config/db');

const Transaction = db.define('transaction', {
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
},{
    timestamps: true
});

module.exports = Transaction;