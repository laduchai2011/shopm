'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');

const baseURL_shopm = 'http://192.168.5.129:3000';

//add other middleware
app.use('/api/svGetOrderMedication', function (req, res, next) {
    // specify CORS headers to send
    res.header('Access-Control-Allow-Origin', baseURL_shopm);
    res.header(
        'Access-Control-Allow-Methods',
        'POST, PUT, PATCH, GET, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers', 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization, X-Firebase-CheckToken'
    );
    next();
});
app.use('/api/svGetOrderMedication', morgan('dev'));
app.use(cookieParser());
app.use('/api/svGetOrderMedication', express.json());
app.use('/api/svGetOrderMedication', express.urlencoded({extended: true}));


app.use('/api/svGetOrderMedication', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 8700;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});