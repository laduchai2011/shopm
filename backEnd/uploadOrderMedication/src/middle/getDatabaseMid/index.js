'use strict';
const { logEvents } = require('../../../logEvents');
const { getCaseRecord } = require('../../middle/getCaseRecord');

async function getCaseRecordMid (req, res, next) {
    try {
        const uuid_caseRecord = req.body.uuid_caseRecord;
        const caseRecord = await getCaseRecord(uuid_caseRecord);
        req.caseRecordMid = caseRecord;
        next();
    } catch (error) {
        logEvents(`${req.url}---${req.method}---${err}`);
        return res.status(500).send(error);
    }
}

module.exports = { getCaseRecordMid }