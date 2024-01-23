'use strict';
const { caseRecordCRUD } = require('../../model/CRUDDATABASE/CRUD_CaseRecord');
const { logEvents } = require('../../../logEvents');

function checkCurrentPage(req, res, next) {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecord = caseRecord.uuid_caseRecord;

    const pageNumber = Number(req.body.pageNumber);
    caseRecordCRUD.read(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't checkCurrentPage !",
                err: err,
                success: false
            })
        } else {
            if (caseRecord && caseRecord===null) {
                return res.status(200).send({ 
                    caseRecord: caseRecord,
                    message: "Can't get case-record in checkCurrentPage !",
                    success: false
                })
            } else {
                const currentPage = Number(caseRecord.currentPage);
                if (currentPage > pageNumber) {
                    return res.status(200).json({ 
                        caseRecord: caseRecord,
                        message: "This page is completed !",
                        success: false,
                        completedPage: true
                    })
                }
                req.currentPage = caseRecord.currentPage;
                next();
            }        
        }
    })
}

module.exports = { checkCurrentPage }