'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const app = express();
const cookieParser = require('cookie-parser');

const baseURL_shopm = process.env.NODE_ENV_BASEURL_SHOPM || `http://shopm.tks.local:3000`;
const service = process.env.SERVICE;

//add other middleware
app.use(`/api/${service}`, function (req, res, next) {
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

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(`/api/${service}`, morgan('dev'));
}

app.use(cookieParser());
app.use(`/api/${service}`, express.json());
app.use(`/api/${service}`, express.urlencoded({extended: true}));

app.use(`/api/${service}`, router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 7400;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});