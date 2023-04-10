const express = require('express');
const http = require('http');
var cors = require('cors');
// const connection = require('./connection');

const userRoute = require('./routes/user');
 
const categoryRoute = require('./routes/category')
 
const productRoute = require('./routes/product') 
 
const billRoute = require('./routes/bill')
 
const dashboardRoute = require('./routes/dashboard')

var app = express();

app.use(cors('*'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log("Listening on 8080");
})

app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/category',categoryRoute);
app.use('/bill',billRoute)
app.use('/dashboard',dashboardRoute)

module.exports = app;


