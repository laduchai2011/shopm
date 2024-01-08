'use strict';
const { caseRecordRole } = require('../../middle/caseRecordRole');

function patientRole(req, res, next) {
    const caseRecord = req.body.caseRecord;
    const userOptions = req.decodedToken.data;
    caseRecordRole.setUp({caseRecord: caseRecord, user: userOptions});
    caseRecordRole.checkRole((isRole, caseRecordRole) => {
        if (isRole && (caseRecordRole==='patient')) {
            req.caseRecordRole = caseRecordRole;
            next();
        } else {
            return res.status(200).json({
                success: false,
                message: 'caseRecordRole invalid !'
            });
        }
    })
}

module.exports = { patientRole }