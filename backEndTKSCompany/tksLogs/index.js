'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const app = express();
const cookieParser = require('cookie-parser');
require('./serviceMessage');

const baseURL_TKS_manager = process.env.NODE_ENV_BASEURL_TKS || `http://shopm.tks.local:3002`;

//add other middleware
app.use('/api/svTKS_Logs', function (req, res, next) {
    // specify CORS headers to send
    res.header('Access-Control-Allow-Origin', baseURL_TKS_manager);
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
    app.use('svTKS_GetChest', morgan('dev'));
}

app.use(cookieParser());
app.use('/api/svTKS_Logs', express.json());
app.use('/api/svTKS_Logs', express.urlencoded({extended: true}));

app.use('/api/svTKS_Logs', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 9000;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});