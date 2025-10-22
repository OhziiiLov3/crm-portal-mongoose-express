const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config();
require('./config/database');
const customerRouter = require('./routes/customerRouter');

const app = express();
const PORT = 3000;
// Middleware
app.use(morgan('dev'));
app.use(express.json());


// root route
app.get("/", (req,res) =>{
    res.send(`<h1>CRM api running</h1> `)
});

// Routes
app.use('/api/customers', customerRouter);




app.listen(PORT, () =>{
    console.log(`listening on port: ${PORT}`)
});


