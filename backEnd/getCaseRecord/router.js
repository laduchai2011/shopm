'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { caseRecord } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');


let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

router.get('/caseRecord/getList', (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const uuid_user = req.query.uuid_user;
    caseRecord.bulkReadWithFk(uuid_user, Number(pageIndex), Number(pageSize), (caseRecords, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record list !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecords: caseRecords,
                message: "Get case-record successly list !",
                success: true
            })
        }
    })
})

router.get('/caseRecord/get', Authentication, (req, res) => {
    const uuid_caseRecord = req.query.uuid_caseRecord;
    const userOptions = req.decodedToken.data;
    caseRecord.readWithUuidAndFk(uuid_caseRecord, userOptions.uuid, userOptions.uuid, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record !",
                err: err,
                success: false
            })
        } else {
            if (caseRecord===null) return res.status(200).send({ 
                message: "Can't get case-record !",
                caseRecord: caseRecord,
                success: false
            })
            const nCaseRecord = {...caseRecord.dataValues}
            res.cookie('caseRecordRole', nCaseRecord.uuid_user === userOptions.uuid ? 'patient' : 'doctorOrPharmacist', {
                secure: secure_cookie,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            })
            return res.status(200).json({ 
                caseRecord: caseRecord,
                message: "Get case-record successly !",
                success: true
            })
        }
    })
})

router.get('/caseRecordPage/getList', Authentication, (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const uuid_caseRecord = req.query.uuid_caseRecord;
    caseRecordPage.bulkReadWithFk(uuid_caseRecord, Number(pageIndex), Number(pageSize), (caseRecordPages, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record page !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordPages: caseRecordPages,
                message: "Get case-record page successly !",
                success: true
            })
        }
    })
})


module.exports = router;