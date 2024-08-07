'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const cookieParser = require('cookie-parser');
const app = express();

const router_notification = require('./router_notification');


const baseURL_shopm = process.env.NODE_ENV_BASEURL_SHOPM || `http://shopm.tks.local:3000`;

app.use('/api/svNotification', function (req, res, next) {
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
    app.use('/api/svNotification', morgan('dev'));
}

app.use(cookieParser());
app.use('/api/svNotification', express.json());
app.use('/api/svNotification', express.urlencoded({extended: true}));

app.use('/api/svNotification', router);

router_notification();

const PORT = process.env.NODE_SERVER_PORT_KEY || 2000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${PORT}!`);
});