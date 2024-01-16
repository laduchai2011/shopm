'use strict';
const { caseRecordCRUD } = require('../../model/CRUDDATABASE/CRUDCASERECORD');
const { logEvents } = require('../../../logEvents');

function completedPrescription(req, res, next) {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecord = caseRecord.uuid_caseRecord;

    caseRecordCRUD.read(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't checkCompletePrescription !",
                err: err,
                success: false
            })
        } else {
            if (caseRecord && caseRecord===null) {
                return res.status(200).send({ 
                    caseRecord: caseRecord,
                    message: "Can't get case-record in checkCompletePrescription !",
                    success: false,
                    completedPrescription: false
                })
            } else {
                if (caseRecord.status === 'completedPrescription') {
                    return res.status(200).json({ 
                        caseRecord: caseRecord,
                        message: `This page is ${ caseRecord.status } !`,
                        success: false,
                        completedPrescription: true
                    })
                } else {
                    next();
                }
            }        
        }
    })
}

function completed(req, res, next) {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecord = caseRecord.uuid_caseRecord;

    caseRecordCRUD.read(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't checkCompleted !",
                err: err,
                success: false
            })
        } else {
            if (caseRecord && caseRecord===null) {
                return res.status(200).send({ 
                    caseRecord: caseRecord,
                    message: "Can't get case-record in checkCompleted !",
                    success: false,
                    completed: false
                })
            } else {
                if (caseRecord.status === 'completed') {
                    return res.status(200).json({ 
                        caseRecord: caseRecord,
                        message: `This page is ${ caseRecord.status } !`,
                        success: false,
                        complete: true
                    })
                } else {
                    next();
                }
            }        
        }
    })
}

function isCompletedPrescription(req, res, next) {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecord = caseRecord.uuid_caseRecord;

    caseRecordCRUD.read(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't checkCompleted !",
                err: err,
                success: false
            })
        } else {
            if (caseRecord && caseRecord===null) {
                return res.status(200).send({ 
                    caseRecord: caseRecord,
                    message: "Can't get case-record in isNotCompletedPrescription !",
                    success: false,
                    completedPrescription: false
                })
            } else {
                if (caseRecord.status === 'completedPrescription') {
                    next();
                } else {
                    return res.status(200).json({ 
                        caseRecord: caseRecord,
                        message: `This page is NOT completedPrescription yet !`,
                        success: false,
                        completedPrescription: false
                    })
                }
            }        
        }
    })
}

module.exports = { completedPrescription, completed, isCompletedPrescription }