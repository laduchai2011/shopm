'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { createCaseRecord } = require('./src/middle/createCaseRecord');


router.post('/caseRecord/getList', Authentication, (req, res) => {
    // const caseRecordOptions = req.body.caseRecordOptions;
    // const dataPage = req.body.dataPage;
    // const userOptions = req.decodedToken.data;
    // caseRecordOptions.uuid_user = userOptions.uuid;
    // createCaseRecord(caseRecordOptions, dataPage, (data, err) => {
    //     if (err) {
    //         logEvents(`${req.url}---${req.method}---${err}`);
    //         return res.status(500).send(err);
    //     } else {
    //         return res.status(200).json(data)
    //     }
    // })
})


module.exports = router;