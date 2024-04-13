'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');

const baseURL_shopm = 'http://172.18.240.1:3000';

//add other middleware
app.use('/api/svGetImage', function (req, res, next) {
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
app.use('/api/svGetImage', function (req, res, next) {
    // specify CORS headers to send
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
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
    app.use('/api/svGetImage', morgan('dev'));
}

app.use('/api/svGetImage', express.json());
app.use(cookieParser());
app.use('/api/svGetImage', express.urlencoded({extended: true}));
app.use('/api/svGetImage', express.static(__dirname + '/public'));

app.use('/api/svGetImage', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 8200

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});