'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { createCaseRecord } = require('./src/middle/createCaseRecord');
const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');


router.post('/caseRecord/create', Authentication, (req, res) => {
    const caseRecordOptions = req.body.caseRecordOptions;
    const dataPage = req.body.dataPage;
    const userOptions = req.decodedToken.data;
    caseRecordOptions.uuid_user = userOptions.uuid;
    createCaseRecord(caseRecordOptions, dataPage, (data, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json(data);
        }
    })
})


router.patch('/caseRecordPage/patch', Authentication, (req, res) => {
    const caseRecordRole = req.body.caseRecordRole;
    const uuid_caseRecordPage = req.body.uuid_caseRecordPage;
    const dataPage = req.body.dataPage;
    switch(caseRecordRole) {
        case 'patient':
            caseRecordPage.update_withSickPerson(uuid_caseRecordPage, JSON.stringify(dataPage), (data, err) => {
                if (err) {
                    logEvents(`${req.url}---${req.method}---${err}`);
                    return res.status(500).send(err);
                } else {
                    return res.status(200).json(data);
                }
            })
            break;
        case 'doctorOrPharmacist':
            // code block
            break;
        default:
            return res.status(404).json({
                success: false,
                message: 'Parameter invalid !'
            })
    }
})

module.exports = router;