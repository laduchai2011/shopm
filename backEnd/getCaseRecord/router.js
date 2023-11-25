'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { caseRecord } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');
const { SvMessage } = require('./src/model/svMessge');

const svMessage = new SvMessage();
svMessage.init();

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

router.get('/caseRecord/get', Authentication, async (req, res) => {
    const uuid_caseRecord = req.query.uuid_caseRecord;
    const userOptions = req.decodedToken.data;
    const _id = uuidv4();
    
    function getCaseRecord(message) {
        const uuid_doctorOrPharmacist = JSON.parse(message).uuid_doctorOrPharmacist;
        const id = JSON.parse(message).id;
        if (_id === id) {
            let uuid_doctorOrPharmacist_m;
    
            if (uuid_doctorOrPharmacist && uuid_doctorOrPharmacist!==null) {
                uuid_doctorOrPharmacist_m = uuid_doctorOrPharmacist;
            } else {
                uuid_doctorOrPharmacist_m = userOptions.uuid;
            }
    
            caseRecord.readWithUuidAndFk(uuid_caseRecord, userOptions.uuid, uuid_doctorOrPharmacist_m, (caseRecord, err) => {
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
                    const nCaseRecord = {...caseRecord.dataValues};
                    let caseRecordRole;
        
                    if(nCaseRecord.uuid_user === userOptions.uuid) {
                        caseRecordRole = 'patient';
                    } else if (nCaseRecord.uuid_doctorOrPharmacist === uuid_doctorOrPharmacist) {
                        caseRecordRole = 'doctorOrPharmacist';
                    } else {
                        caseRecordRole = 'notPermission';
                    }
        
                    res.cookie('caseRecordRole', caseRecordRole, {
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
        }
    }

    await svMessage.receiveMessage(`feedback__Uuid_doctorOrPharmacist__via__uuid_user___${_id}`, { unsubscribe: true }, getCaseRecord);
    svMessage.sendMessage('require__Uuid_doctorOrPharmacist__via__uuid_user', JSON.stringify({ id: _id, uuid_user: userOptions.uuid }));
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