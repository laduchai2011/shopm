'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { createCaseRecord } = require('./src/middle/createCaseRecord');
const { caseRecord } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordRole } = require('./src/middle/caseRecordRole');
const { caseRecordPrescription } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordPrescription');
const { caseRecordMedication } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordMedication');
// const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');
const { doctorOrPharmacistRole } = require('./src/middle/doctorOrPharmacistRole');
const { currentCart } = require('./src/middle/currentCart');
const { SvMessage } = require('./src/model/svMessge');

const svMessage = new SvMessage();
svMessage.init();

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

router.patch('/caseRecord/savePrescription', Authentication, doctorOrPharmacistRole, currentCart, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const user = req.decodedToken.data;

    const uuid_caseRecordPrescription = req.body.uuid_caseRecordPrescription;
    const prescription = req.body.prescription;

    caseRecordRole.setUp({caseRecord: caseRecord, user: user});
    caseRecordRole.checkRole((isRole, caseRecordRole) => {
        if (isRole) {
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
        }
    })
})

router.post('/caseRecord/addMedication', Authentication, doctorOrPharmacistRole, currentCart, (req, res) => {
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

router.patch('/caseRecord/editMedication', Authentication, doctorOrPharmacistRole, (req, res) => {
    const uuid_caseRecordMedication = req.body.uuid_caseRecordMedication;
    const amount = req.body.amount;
    const note = req.body.note;
    caseRecordMedication.edit(uuid_caseRecordMedication, amount, note, (caseRecordMedication, err) => {
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

router.delete('/caseRecord/deleteMedication', Authentication, doctorOrPharmacistRole, (req, res) => {
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

module.exports = router;