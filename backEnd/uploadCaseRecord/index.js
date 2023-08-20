'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');

//add other middleware
app.use('/api/svUploadCaseRecord', function (req, res, next) {
    // specify CORS headers to send
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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

if (process.env.NODE_ENV === 'development') {
    app.use('/api/svUploadCaseRecord', morgan('dev'));
}

app.use(cookieParser());
app.use('/api/svUploadCaseRecord', express.json());
app.use('/api/svUploadCaseRecord', express.urlencoded({extended: true}));


app.use('/api/svUploadCaseRecord', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 7200;

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});