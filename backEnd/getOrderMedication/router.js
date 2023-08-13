'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { crudMedication } = require('./src/model/CRUDDATABASE/CRUDMEDICATION');
const { crudProvider } = require('./src/model/CRUDDATABASE/CRUDPROVIDER');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');





module.exports = router;