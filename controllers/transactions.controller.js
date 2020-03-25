const Transaction = require('../models/transactions.model');
const Sequelize = require('sequelize');

function parse(trans){
    let sTransactions = JSON.stringify(trans);
    let pTransactions = JSON.parse(sTransactions);
    return pTransactions;
}


// @desc Get all transactions
// @route GET /api/v1/transactions
// @access public

exports.getTransactions = (req, res, next) => {
    Transaction.findAll()
    .then(transactions =>{
        console.log(transactions);
        transactions = parse(transactions);
        console.log(transactions);
        
        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    })
    .catch(err =>{
        console.log(err);

        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    })
}

// @desc Add transaction
// @route POST /api/v1/transactions
// @access public

exports.addTransaction = (req, res, next) => {
    // const { text, amount } = req.body;

    console.log(req.body);
    console.log(req.params);
    if(req.body.text !== undefined && req.body.amount !== undefined){
        Transaction.create(req.body)
        .then(status =>{
            console.log(status);
            
            res.status(201).json({
                success: true,
                data: parse(status)
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        })
    }else{
        res.status(400).json({
            success: false,
            data: "Please send both text and amount!"
        })
    }
}


// @desc DELETE all transactions
// @route DELETE /api/v1/transactions/:id
// @access public

exports.deleteTransaction = (req, res, next) => {
    Transaction.findAll({ where: { id: req.params.id } })
    .then(status =>{
        status = parse(status);
        console.log(status)
        if(status.length > 0){
            Transaction.destroy({ where: { id: status[0].id } })
            .then(msg =>{
                console.log(msg)
                res.status(200).json({
                    success: true,
                    data: 'Deleted Successfully'
                })
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({
                    success: false,
                    error: 'Server Error'
                });
            })
        }else{
            res.status(404).json({
                success: false,
                error: 'Transaction not found!'
            })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    })
}