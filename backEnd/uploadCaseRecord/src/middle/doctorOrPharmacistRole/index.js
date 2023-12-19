'use strict';
const { caseRecordRole } = require('../../middle/caseRecordRole');

function doctorOrPharmacistRole(req, res, next) {
    const caseRecord = req.body.caseRecord;
    const userOptions = req.decodedToken.data;
    caseRecordRole.setUp({caseRecord: caseRecord, user: userOptions});
    caseRecordRole.checkRole((isRole, caseRecordRole) => {
        if (isRole && (caseRecordRole==='doctorOrPharmacist')) {
            next();
        } else {
            return res.status(200).json({
                success: false,
                message: 'caseRecordRole invalid !'
            });
        }
    })
}

module.exports = { doctorOrPharmacistRole }