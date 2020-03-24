const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// database
const db = require('./config/db');

db.authenticate().then(res => console.log("db connected successfully".cyan.underline.bold)).catch(err => console.log(err));

dotenv.config({ path: './config/config.env' });

const transactions = require('./routes/transactions');

const app = express();
app.use(express.json());
app.use('/api/v1/transactions', transactions);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on localhost: ${PORT} running in ${process.env.NODE_ENV} mode`.yellow.bold));