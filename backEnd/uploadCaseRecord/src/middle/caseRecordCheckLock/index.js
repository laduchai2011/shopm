'use strict';
const { serviceRedis } = require('../../model/serviceRedis');
const { serviceRedlock } = require('../../config/serviceRedlock');

/**
*@typedef {
*caseRecord: caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLock: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

async function caseRecordCheckLock (req, res, next) {
    const caseRecord = req.body.caseRecord;
    const pageNumber = req.body.pageNumber;
    const caseRecordLockKey = `redlock-caseRecordLock-${ caseRecord.uuid_caseRecord }`;
    const caseRecordLockKey_dataCache = `caseRecordLock-${ caseRecord.uuid_caseRecord }`;
    const caseRecordRole = req.caseRecordRole;

    const doctorOrPharmacistLock = await serviceRedlock.acquire([caseRecordLockKey], 10000);

    serviceRedis.getData(caseRecordLockKey_dataCache, (caseRecordLockOptions) => {
        doctorOrPharmacistLock.release();
        if (!caseRecordLockOptions?.isLock || 
            ((caseRecordLockOptions?.isLock && caseRecordLockOptions?.caseRecordRole===caseRecordRole) && caseRecordLockOptions?.pageNumber===pageNumber)
        ) {
            next();
        } else {
            return res.status(200).send({
                caseRecordLockOptions: caseRecordLockOptions,
                message: 'caseRecordCheckLock NOT success',
                success: false
            })
        }
    });
}

module.exports = { caseRecordCheckLock }