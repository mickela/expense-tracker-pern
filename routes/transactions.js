const express = require('express');
const router = express.Router();

// transactions controller(s)
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions.controller');

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);

module.exports = router;