'use strict';
const { caseRecordRole } = require('../../middle/caseRecordRole');
const { caseRecord } = require('../../model/CRUDDATABASE/CRUDCASERECORD');
const { logEvents } = require('../../../logEvents');

function doctorOrPharmacistAndPatientRole(req, res, next) {
    const userOptions = req.decodedToken.data;
    const uuid_caseRecord = req.query.uuid_caseRecord;
    caseRecord.read(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't doctorOrPharmacistAndPatientRole !",
                err: err,
                success: false
            })
        } else {
            caseRecordRole.setUp({caseRecord: caseRecord, user: userOptions});
            caseRecordRole.checkRole((isRole, caseRecordRole) => {
                if (isRole && (caseRecordRole==='doctorOrPharmacist' || caseRecordRole==='patient')) {
                    req.caseRecordRole = caseRecordRole;
                    next();
                } else {
                    return res.status(200).json({
                        success: false,
                        message: 'doctorOrPharmacistAndPatientRole invalid !'
                    });
                }
            })
        }
    })
}

module.exports = { doctorOrPharmacistAndPatientRole }