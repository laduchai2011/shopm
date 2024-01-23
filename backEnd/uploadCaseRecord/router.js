'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { caseRecordCRUD } = require('./src/model/CRUDDATABASE/CRUD_CaseRecord');
// const { caseRecordRole } = require('./src/middle/caseRecordRole');
const { caseRecordDescriptionCRUD } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordDescription');
const { caseRecordImageCRUD } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordImage');
const { caseRecordPrescription } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordPrescription');
const { caseRecordMedication } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordMedication');
// const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');
const { doctorOrPharmacistAndPatientRole } = require('./src/middle/doctorOrPharmacistAndPatientRole');
const { doctorOrPharmacistRole } = require('./src/middle/doctorOrPharmacistRole');
const { patientRole } = require('./src/middle/patientRole');
const { currentCart } = require('./src/middle/currentCart');
const { caseRecordCheckLock } = require('./src/middle/caseRecordCheckLock');
const { checkCurrentPage } = require('./src/middle/checkCurrentPage');
const { completedPrescription, completed, isCompletedPrescription } = require('./src/middle/checkComplete');
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

router.post('/caseRecord/createCaseRecord', Authentication, (req, res) => {
    const caseRecordOptions = req.body.caseRecordOptions;
    const userOptions = req.decodedToken.data;
    caseRecordOptions.uuid_user = userOptions.uuid;
    caseRecordCRUD.create(caseRecordOptions, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecord && caseRecord!==null) {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: true,
                    message: 'create caseRecord successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: false,
                    message: 'create caseRecord NOT successly !'
                });
            } 
        }
    })
})

router.post('/caseRecord/createDescription', Authentication, (req, res) => {
    const caseRecordDescriptionOptions = req.body.caseRecordDescriptionOptions;
    caseRecordDescriptionCRUD.create(caseRecordDescriptionOptions, (caseRecordDescription, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordDescription && caseRecordDescription!==null) {
                return res.status(200).json({
                    caseRecordDescription: caseRecordDescription,
                    success: true,
                    message: 'create caseRecordDescription successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordDescription: caseRecordDescription,
                    success: false,
                    message: 'create caseRecordDescription NOT successly !'
                });
            } 
        }
    })
})

router.post('/caseRecord/bulkCreateImage', Authentication, (req, res) => {
    const caseRecordImageOptionsArray = req.body.caseRecordImageOptionsArray;
    caseRecordImageCRUD.bulkCreate(caseRecordImageOptionsArray, (caseRecordImages, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordImages && caseRecordImages!==null) {
                return res.status(200).json({
                    caseRecordImages: caseRecordImages,
                    success: true,
                    message: 'create caseRecordImages bulkCreateImage successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordImages: caseRecordImages,
                    success: false,
                    message: 'create caseRecordImages bulkCreateImage NOT successly !'
                });
            } 
        }
    })
})

router.post('/caseRecord/createImage', Authentication, patientRole, checkCurrentPage, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
    const caseRecordImageOptions = req.body.caseRecordImageOptions;
    const pageNumber = req.currentPage;
    caseRecordImageOptions.pageNumber = pageNumber;
    caseRecordImageCRUD.create(caseRecordImageOptions, (caseRecordImage, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordImage && caseRecordImage!==null) {
                return res.status(200).json({
                    caseRecordImage: caseRecordImage,
                    success: true,
                    message: 'create caseRecordImage createImage successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordImage: caseRecordImage,
                    success: false,
                    message: 'create caseRecordImage createImage NOT successly !'
                });
            } 
        }
    })
})

router.post('/caseRecord/createPrescription', Authentication, (req, res) => {
    const caseRecordPrescriptionOptions = req.body.caseRecordPrescriptionOptions;
    caseRecordPrescription.create(caseRecordPrescriptionOptions, (caseRecordPrescription, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecordPrescription && caseRecordPrescription!==null) {
                return res.status(200).json({
                    caseRecordPrescription: caseRecordPrescription,
                    success: true,
                    message: 'create caseRecordPrescription successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecordPrescription: caseRecordPrescription,
                    success: false,
                    message: 'create caseRecordPrescription NOT successly !'
                });
            } 
        }
    })
})

router.patch('/caseRecord/sendRequireToDoctorPharmacist', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const uuid_doctorOrPharmacist = req.body.uuid_doctorOrPharmacist;
    caseRecordCRUD.sendRequireToDoctorPharmacist(userOptions.uuid, uuid_caseRecord, uuid_doctorOrPharmacist, (caseRecord, err) => {
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
    caseRecordCRUD.updateDoctorPharmacist(userOptions.uuid, uuid_caseRecord, uuid_doctorOrPharmacist, (caseRecord, err) => {
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

router.patch('/caseRecord/patchStatusCRCCaseRecord', Authentication, patientRole, (req, res) => {
    const caseRecordOptions = req.body.caseRecord;
    const uuid_caseRecord = caseRecordOptions.uuid_caseRecord;
    caseRecordCRUD.patchStatusCRC(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecord && caseRecord!==null) {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: true,
                    message: 'create patchStatusCRCCaseRecord successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: false,
                    message: 'create patchStatusCRCCaseRecord NOT successly !'
                });
            } 
        }
    })
})

router.patch('/caseRecord/patchDescription', Authentication, patientRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecordDescription = req.body.uuid_caseRecordDescription;
    const description = req.body.description;

    caseRecordDescriptionCRUD.updateWithCaseRecord(uuid_caseRecordDescription, description, (caseRecordDescription, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({
                caseRecordDescription: caseRecordDescription,
                success: true,
                message: `Patch caseRecordDescription ( ${uuid_caseRecordDescription} ) for case-record ( ${caseRecord.uuid_caseRecord} ) successly !`
            });
        }
    })
})

// router.patch('/caseRecord/patchImages', Authentication, patientRole, caseRecordCheckLock, (req, res) => {
//     const caseRecord = req.body.caseRecord;
//     const uuid_caseRecordImage = req.body.uuid_caseRecordImage;
//     const images = req.body.images;

//     caseRecordImageCRUD.updateWithCaseRecord(uuid_caseRecordImage, images, (caseRecordImages, err) => {
//         if (err) {
//             logEvents(`${req.url}---${req.method}---${err}`);
//             return res.status(500).send(err);
//         } else {
//             return res.status(200).json({
//                 caseRecordImages: caseRecordImages,
//                 success: true,
//                 message: `Patch caseRecordDescription ( ${uuid_caseRecordImage} ) for case-record ( ${caseRecord.uuid_caseRecord} ) successly !`
//             });
//         }
//     })
// })

router.patch('/caseRecord/patchCaseRecordImageTitle', Authentication, patientRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecordImage = req.body.uuid_caseRecordImage;
    const title = req.body.title;
    caseRecordImageCRUD.updateImageTitleWithCaseRecord(uuid_caseRecordImage, title, (caseRecordImage, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({
                caseRecordImage: caseRecordImage,
                success: true,
                message: `Patch patchCaseRecordImageTitle ( ${uuid_caseRecordImage} ) for case-record ( ${caseRecord.uuid_caseRecord} ) successly !`
            });
        }
    })
})

router.patch('/caseRecord/deleteCaseRecordImage', Authentication, patientRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecordImage = req.body.uuid_caseRecordImage;
    caseRecordImageCRUD.deleteWithCaseRecord(uuid_caseRecordImage, (caseRecordImage, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            return res.status(200).json({
                caseRecordImage: caseRecordImage,
                success: true,
                message: `Patch deleteCaseRecordImage ( ${uuid_caseRecordImage} ) for case-record ( ${caseRecord.uuid_caseRecord} ) successly !`
            });
        }
    })
})

router.patch('/caseRecord/savePrescription', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
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

router.post('/caseRecord/addMedication', Authentication, doctorOrPharmacistRole, currentCart, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
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

router.patch('/caseRecord/editMedication', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
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

router.delete('/caseRecord/deleteMedication', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
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

router.post('/caseRecord/createLock', Authentication, doctorOrPharmacistAndPatientRole, caseRecordCheckLock, completed, completedPrescription, async (req, res) => {
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

router.delete('/caseRecord/deleteLock', Authentication, doctorOrPharmacistAndPatientRole, caseRecordCheckLock, completed, completedPrescription, async (req, res) => {
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

router.patch('/caseRecord/patchSatusIsCompletedPrescription', Authentication, doctorOrPharmacistRole, caseRecordCheckLock, completed, completedPrescription, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecord = caseRecord.uuid_caseRecord;
    caseRecordCRUD.completedPrescription(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecord && caseRecord === null) {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: false,
                    message: 'completedPrescription NOT successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: true,
                    message: 'completedPrescription successly !'
                });
            }
        }
    })
})

router.patch('/caseRecord/patchSatusIsCompleted', Authentication, patientRole, caseRecordCheckLock, completed, isCompletedPrescription, (req, res) => {
    const caseRecord = req.body.caseRecord;
    const uuid_caseRecord = caseRecord.uuid_caseRecord;
    caseRecordCRUD.completed(uuid_caseRecord, (caseRecord, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (caseRecord && caseRecord === null) {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: false,
                    message: 'completed NOT successly !'
                });
            } else {
                return res.status(200).json({
                    caseRecord: caseRecord,
                    success: true,
                    message: 'completed successly !'
                });
            }
        }
    })
})

module.exports = router;