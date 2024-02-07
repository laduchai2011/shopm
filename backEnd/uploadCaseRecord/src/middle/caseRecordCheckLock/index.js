'use strict';
const { serviceRedis } = require('../../model/serviceRedis');
const { serviceRedlock } = require('../../config/serviceRedlock');

/**
*@typedef {
*uuid_caseRecord: uuid_caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLocked: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

async function caseRecordCheckLock (req, res, next) {
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const pageNumber = req.body.pageNumber;
    const caseRecordLockKey = `redlock-caseRecordLock-${ uuid_caseRecord }`;
    const caseRecordLockKey_dataCache = `caseRecordLock-${ uuid_caseRecord }`;
    const caseRecordRole = req.caseRecordRole;

    const doctorOrPharmacistLock = await serviceRedlock.acquire([caseRecordLockKey], 10000);

    serviceRedis.getData(caseRecordLockKey_dataCache, (caseRecordLockOptions) => {
        doctorOrPharmacistLock.release();
        if (!caseRecordLockOptions?.isLocked || 
            ((caseRecordLockOptions?.isLocked && caseRecordLockOptions?.caseRecordRole===caseRecordRole) && caseRecordLockOptions?.pageNumber===pageNumber)
        ) {
            next();
        } else {
            return res.status(200).send({
                caseRecordLockOptions: caseRecordLockOptions,
                message: 'This page is locked',
                success: false,
                isLocked: true, 
                checkedType: 'locked'
            })
        }
    });
}

module.exports = { caseRecordCheckLock }