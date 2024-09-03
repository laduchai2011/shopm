'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const app = express();
const cookieParser = require('cookie-parser');

const baseURL_TKS_manager = process.env.NODE_ENV_BASEURL_SHOPM || `http://shopm.tks.local:3002`;

//add other middleware
app.use('/api/svUploadChest', function (req, res, next) {
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
    app.use('/api/svUploadChest', morgan('dev'));
}

app.use(cookieParser());
app.use('/api/svUploadChest', express.json());
app.use('/api/svUploadChest', express.urlencoded({extended: true}));


app.use('/api/svUploadChest', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 3500;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});