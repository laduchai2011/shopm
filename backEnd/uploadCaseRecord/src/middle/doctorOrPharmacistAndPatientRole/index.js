'use strict';
const { caseRecordRole } = require('../../middle/caseRecordRole');

function doctorOrPharmacistAndPatientRole(req, res, next) {
    const caseRecord = req.caseRecordMid;
    const userOptions = req.decodedToken.data;
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

module.exports = { doctorOrPharmacistAndPatientRole }