'use strict';
const { caseRecordCRUD } = require('../../model/CRUDDATABASE/CRUD_CaseRecord');
const { logEvents } = require('../../../logEvents');

function getCaseRecordMid (req, res, next) {
    const uuid_caseRecord = req.body.uuid_caseRecord;

    caseRecordCRUD.read(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't getCaseRecordMid !",
                err: err,
                success: false
            })
        } else {
            if (caseRecord && caseRecord!==null) {
                req.caseRecordMid = caseRecord;
                next();
            } else {
                return res.status(200).send({ 
                    caseRecord: caseRecord,
                    message: "Can't get case-record in getCaseRecordMid !",
                    success: false
                })
            }        
        }
    })
}

module.exports = { getCaseRecordMid }