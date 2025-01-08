'use strict';
const express = require("express");
const router = require('./router');
const app = express();


app.use('/', router);

const PORT = 8448;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});