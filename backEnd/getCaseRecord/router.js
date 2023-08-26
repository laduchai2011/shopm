'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { caseRecord } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');


router.get('/caseRecord/getList', Authentication, (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const userOptions = req.decodedToken.data;
    caseRecord.bulkRead(userOptions.uuid, Number(pageIndex), Number(pageSize), (caseRecords, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecords: caseRecords,
                message: "Get case-record successly !",
                success: true
            })
        }
    })
})


module.exports = router;