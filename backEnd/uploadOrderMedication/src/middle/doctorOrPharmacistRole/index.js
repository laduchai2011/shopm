'use strict';
const { caseRecordRole } = require('../../middle/caseRecordRole');
const { getCaseRecord } = require('../../middle/getCaseRecord');
const { logEvents } = require('../../../logEvents');

function doctorOrPharmacistRole(req, res, next) {
    try {
        const uuid_caseRecord = req.body.uuid_caseRecord;
        const caseRecord = getCaseRecord(uuid_caseRecord);
        const userOptions = req.decodedToken.data;
        caseRecordRole.setUp({caseRecord: caseRecord, user: userOptions});
        caseRecordRole.checkRole((isRole, caseRecordRole) => {
            if (isRole && (caseRecordRole==='doctorOrPharmacist')) {
                req.caseRecordRole = caseRecordRole;
                next();
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'caseRecordRole invalid !'
                });
            }
        })
    } catch (error) {
        logEvents(`${req.url}---${req.method}---${err}`);
        return res.status(500).send(error);
    }
}

module.exports = { doctorOrPharmacistRole }