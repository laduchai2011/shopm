'use strict';
require('dotenv').config();
const express = require("express");
const router = require('./router');
const app = express();
const cookieParser = require('cookie-parser');
const fileupload = require("express-fileupload");

const baseURL_shopm = process.env.NODE_ENV_BASEURL_SHOPM || `http://shopm.tks.local:3000`;

//add other middleware
app.use(cookieParser());
app.use('/api/svUploadImage', fileupload());
app.use('/api/svUploadImage', express.json());
app.use('/api/svUploadImage', express.urlencoded({extended: true}));
// app.use('/api', express.static(__dirname + '/public'));
app.use('/api/svUploadImage', function (req, res, next) {
    // specify CORS headers to send
    res.header('Access-Control-Allow-Origin', baseURL_shopm);
    res.header(
      'Access-Control-Allow-Methods',
      'POST, PUT, PATCH, GET, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
    );
    next();
});

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use('/api/svUploadImage', morgan('dev'));
}

app.use(cookieParser());
app.use('/api/svGetCaseRecord', express.json());
app.use('/api/svGetCaseRecord', express.urlencoded({extended: true}));
// app.use('/api/svUploadImage', function (req, res, next) {
//   // specify CORS headers to send
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.header(
//     'Access-Control-Allow-Methods',
//     'POST, PUT, PATCH, GET, DELETE, OPTIONS',
//   );
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
//   );
//   next();
// });

app.use('/api/svUploadImage', router);

const PORT = process.env.NODE_SERVER_PORT_KEY || 8100;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});