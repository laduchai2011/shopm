'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { createCaseRecord } = require('./src/middle/createCaseRecord');
const { caseRecord } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');


router.post('/caseRecord/create', Authentication, (req, res) => {
    const caseRecordData = req.body;
    const userOptions = req.decodedToken.data;
    caseRecordData.caseRecordOptions.uuid_user = userOptions.uuid;
    createCaseRecord(caseRecordData, (data, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json(data);
        }
    })
})

router.patch('/caseRecord/sendRequireToDoctorPharmacist', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const uuid_doctorOrPharmacist = req.body.uuid_doctorOrPharmacist;
    caseRecord.sendRequireToDoctorPharmacist(userOptions.uuid, uuid_caseRecord, uuid_doctorOrPharmacist, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecord) {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: true,
                    message: `sendRequireToDoctorPharmacist ( ${uuid_doctorOrPharmacist} ) for case-record ( ${uuid_caseRecord} ) successly !`
                });
            } else {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: false,
                    message: `sendRequireToDoctorPharmacist ( ${uuid_doctorOrPharmacist} ) for case-record ( ${uuid_caseRecord} ) successly !`
                });
            }
        }
    })
})

router.patch('/caseRecord/patchDoctorPharmacist', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const uuid_doctorOrPharmacist = req.body.uuid_doctorOrPharmacist;
    caseRecord.updateDoctorPharmacist(userOptions.uuid, uuid_caseRecord, uuid_doctorOrPharmacist, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({
                caseRecord: caseRecord,
                success: true,
                message: `Patch doctorPharmacist ( ${uuid_doctorOrPharmacist} ) for case-record ( ${uuid_caseRecord} ) successly !`
            });
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