'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');

//add other middleware
app.use('/api/svUploadProviderNews', function (req, res, next) {
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

app.use('/api/svUploadProviderNews', morgan('dev'));
app.use(cookieParser());
app.use('/api/svUploadProviderNews', express.json());
app.use('/api/svUploadProviderNews', express.urlencoded({extended: true}));


app.use('/api/svUploadProviderNews', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 8900;

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}!`);
});