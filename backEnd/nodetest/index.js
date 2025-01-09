'use strict';
const express = require("express");
const router = require('./router');
const app = express();
const path = require('path');


app.use('/', router);

const PORT = 8448;

app.listen(PORT, '0.0.0.0', function () {
    console.log(`Listening on port ${PORT}!`);
});

const from = '/user/local';
const to = '/user/local/lib/file.txt';
const filePath = '/user/local/lib/file.txt'
console.log(path.relative(from, to)); // Output: '../lib/file.txt'
console.log('Directory:', path.dirname(filePath));
console.log('File Name:', path.basename(filePath));
console.log('Extension:', path.extname(filePath));
console.log('Is Absolute:', path.isAbsolute(filePath));