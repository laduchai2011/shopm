'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { createCaseRecord } = require('./src/middle/createCaseRecord');
const { caseRecord } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');
// const { caseRecordRole } = require('./src/middle/caseRecordRole');
const { caseRecordPrescription } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordPrescription');
const { caseRecordMedication } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordMedication');
// const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');
const { doctorOrPharmacistAndPatientRole } = require('./src/middle/doctorOrPharmacistAndPatientRole');
const { doctorOrPharmacistRole } = require('./src/middle/doctorOrPharmacistRole');
const { currentCart } = require('./src/middle/currentCart');
const { caseRecordCheckLock } = require('./src/middle/caseRecordCheckLock');
const { SvMessage } = require('./src/model/svMessge');

const svMessage = new SvMessage();
svMessage.init();

/**
*@typedef {
*caseRecord: caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLock: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

router.post('/caseRecord/create', Authentication, (req, res) => {
    const caseRecordData = req.body;
    const userOptions = req.decodedToken.data;
    caseRecordData.caseRecordOptions.uuid_user = userOptions.uuid;
    createCaseRecord(caseRecordData, (data, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json(data);
        }
    })
})

router.patch('/caseRecord/sendRequireToDoctorPharmacist', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const uuid_doctorOrPharmacist = req.body.uuid_doctorOrPharmacist;
    caseRecord.sendRequireToDoctorPharmacist(userOptions.uuid, uuid_caseRecord, uuid_doctorOrPharmacist, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecord) {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: true,
                    message: `sendRequireToDoctorPharmacist ( ${uuid_doctorOrPharmacist} ) for case-record ( ${uuid_caseRecord} ) successly !`
                });
            } else {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: false,
                    message: `sendRequireToDoctorPharmacist ( ${uuid_doctorOrPharmacist} ) for case-record ( ${uuid_caseRecord} ) successly !`
                });
            }
        }
    })
})

router.patch('/caseRecord/patchDoctorPharmacist', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const uuid_doctorOrPharmacist = req.body.uuid_doctorOrPharmacist;
    caseRecord.updateDoctorPharmacist(userOptions.uuid, uuid_caseRecord, uuid_doctorOrPharmacist, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({
                caseRecord: caseRecord,
                success: true,
                message: `Patch doctorPharmacist ( ${uuid_doctorOrPharmacist} ) for case-record ( ${uuid_caseRecord} ) successly !`
            });
        }
    })
})

// router.patch('/caseRecordPage/patch', Authentication, (req, res) => {
//     const caseRecordRole = req.body.caseRecordRole;
//     const uuid_caseRecordPage = req.body.uuid_caseRecordPage;
//     const dataPage = req.body.dataPage;
//     switch(caseRecordRole) {
//         case 'patient':
//             caseRecordPage.update_withSickPerson(uuid_caseRecordPage, JSON.stringify(dataPage), (data, err) => {
//                 if (err) {
//                     logEvents(`${req.url}---${req.method}---${err}`);
//                     return res.status(500).send(err);
//                 } else {
//                     return res.status(200).json(data);
//                 }
//             })
//             break;
//         case 'doctorOrPharmacist':
//             // code block
//             break;
//         default:
//             return res.status(404).json({
//                 success: false,
//                 message: 'Parameter invalid !'
//             })
//     }
// })

router.patch('/caseRecord/savePrescription', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecordPrescription = req.body.uuid_caseRecordPrescription;
    const prescription = req.body.prescription;

    caseRecordPrescription.updateWithCaseRecord(uuid_caseRecordPrescription, prescription, (caseRecordPrescription, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({
                caseRecordPrescription: caseRecordPrescription,
                success: true,
                message: `Patch caseRecordPrescription ( ${uuid_caseRecordPrescription} ) for case-record ( ${caseRecord.uuid_caseRecord} ) successly !`
            });
        }
    })
})

router.post('/caseRecord/addMedication', Authentication, doctorOrPharmacistRole, currentCart, caseRecordCheckLock, (req, res) => {
    const currentCart = req.currentCart;
    const caseRecordMedicationOptions = req.body.caseRecordMedicationOptions;
    caseRecordMedicationOptions.pageNumber = currentCart.pageNumber;
    caseRecordMedicationOptions.uuid_caseRecord = currentCart.uuid_caseRecord;
    caseRecordMedication.create(caseRecordMedicationOptions, (caseRecordMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordMedication === null) {
                return res.status(200).json({
                    caseRecordMedication: caseRecordMedication,
                    success: false,
                    message: 'Add medication NOT successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordMedication: caseRecordMedication,
                    success: true,
                    message: 'Add medication successly !'
                });
            }
        }
    })
})

router.patch('/caseRecord/editMedication', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, (req, res) => {
    const uuid_caseRecordMedication = req.body.uuid_caseRecordMedication;
    const amount = req.body.amount;
    const note = req.body.note;
    const cost = req.body.cost;
    caseRecordMedication.edit(uuid_caseRecordMedication, amount, note, cost, (caseRecordMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordMedication === null) {
                return res.status(200).json({
                    caseRecordMedication: caseRecordMedication,
                    success: false,
                    message: 'Edit medication NOT successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordMedication: caseRecordMedication,
                    success: true,
                    message: 'Edit medication successly !'
                });
            }
        }
    })
})

router.delete('/caseRecord/deleteMedication', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, (req, res) => {
    const uuid_caseRecordMedication = req.body.uuid_caseRecordMedication;
    caseRecordMedication.delete(uuid_caseRecordMedication, (caseRecordMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordMedication === null) {
                return res.status(200).json({
                    caseRecordMedication: caseRecordMedication,
                    success: false,
                    message: 'Delete medication NOT successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordMedication: caseRecordMedication,
                    success: true,
                    message: 'Delete medication successly !'
                });
            }
        }
    })
})

router.post('/caseRecord/createLock', Authentication, doctorOrPharmacistAndPatientRole, caseRecordCheckLock, async (req, res) => {
    const caseRecord = req.body.caseRecord;
    const pageNumber = req.body.pageNumber;
    const caseRecordLockKey = `redlock-caseRecordLock-${ caseRecord.uuid_caseRecord }`;
    const caseRecordLockKey_dataCache = `caseRecordLock-${ caseRecord.uuid_caseRecord }`;
    const caseRecordRole = req.caseRecordRole;

    const timeExpireat = 60*60*24*30*12; // 1 year
    const caseRecordLockOptions = {
        caseRecord: caseRecord,
        caseRecordRole: caseRecordRole, 
        isLock: true,
        pageNumber: pageNumber
    }

    const doctorOrPharmacistLock = await serviceRedlock.acquire([caseRecordLockKey], 10000);

    const isSetData = await serviceRedis.setData(caseRecordLockKey_dataCache, caseRecordLockOptions, timeExpireat);

    await doctorOrPharmacistLock.release();

    if (isSetData) {
        return res.status(200).send({
            caseRecordLock: caseRecordLockOptions,
            message: 'create caseRecordLock success',
            success: true
        })
    }
     
    return res.status(200).send({
        caseRecordLock: caseRecordLockOptions,
        message: 'create caseRecordLock NOT success',
        success: false
    })
})

router.delete('/caseRecord/deleteLock', Authentication, doctorOrPharmacistAndPatientRole, caseRecordCheckLock, async (req, res) => {
    const caseRecord = req.body.caseRecord;
    const caseRecordLockKey = `redlock-caseRecordLock-${ caseRecord.uuid_caseRecord }`;
    const caseRecordLockKey_dataCache = `caseRecordLock-${ caseRecord.uuid_caseRecord }`;
    const doctorOrPharmacistLock = await serviceRedlock.acquire([caseRecordLockKey], 10000);
    const isDeleteKey = await serviceRedis.deleteData(caseRecordLockKey_dataCache);
    await doctorOrPharmacistLock.release();
    if (isDeleteKey) {
        return res.send({
            message: 'deleteLock successly',
            success: true
        })
    } else {
        return res.send({
            message: 'deleteLock NOT successly',
            success: false
        })
    }
})

module.exports = router;