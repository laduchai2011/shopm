'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { caseRecordCRUD } = require('./src/model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordDescription } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordDescription');
const { caseRecordImageCRUD } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordImage');
const { caseRecordVideo } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordVideo');
const { caseRecordPrescription } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordPrescription');
const { caseRecordMedication } = require('./src/model/CRUDDATABASE/CRUD_CaseRecordMedication');
// const { caseRecordPage } = require('./src/model/CRUDDATABASE/CRUDCASERECORDPAGE');
const { doctorOrPharmacistAndPatientRole } = require('./src/middle/doctorOrPharmacistAndPatientRole');
// const { doctorOrPharmacistRole } = require('./src/middle/doctorOrPharmacistRole');
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


let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

router.get('/caseRecord/getList', (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const uuid_user = req.query.uuid_user;
    caseRecordCRUD.bulkReadWithFk(uuid_user, Number(pageIndex), Number(pageSize), (caseRecords, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record list !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecords: caseRecords,
                message: "Get case-record successly list !",
                success: true
            })
        }
    })
})

// router.get('/caseRecord/get', Authentication, async (req, res) => {
//     const uuid_caseRecord = req.query.uuid_caseRecord;
//     const userOptions = req.decodedToken.data;
//     const _id = uuidv4();
    
//     function getCaseRecord(message) {
//         const uuid_doctorOrPharmacist = JSON.parse(message).uuid_doctorOrPharmacist;
//         const id = JSON.parse(message).id;
//         if (_id === id) {
//             let uuid_doctorOrPharmacist_m;
    
//             if (uuid_doctorOrPharmacist && uuid_doctorOrPharmacist!==null) {
//                 uuid_doctorOrPharmacist_m = uuid_doctorOrPharmacist;
//             } else {
//                 uuid_doctorOrPharmacist_m = userOptions.uuid;
//             }
    
//             caseRecord.readWithUuidAndFk(uuid_caseRecord, userOptions.uuid, uuid_doctorOrPharmacist_m, (caseRecord, err) => {
//                 if (err) {
//                     logEvents(`${req.url}---${req.method}---${err}`);
//                     return res.status(500).send({ 
//                         message: "Can't get case-record !",
//                         err: err,
//                         success: false
//                     })
//                 } else {
//                     let caseRecordRole = 'notPermission';
//                     if (caseRecord===null) {
//                         res.cookie('caseRecordRole', caseRecordRole, {
//                             secure: secure_cookie,
//                             expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//                         })
//                         return res.status(200).send({ 
//                             message: "Can't get case-record !",
//                             caseRecord: caseRecord,
//                             success: false
//                         })
//                     } else {
//                         const nCaseRecord = {...caseRecord.dataValues};
        
//                         if(nCaseRecord.uuid_user === userOptions.uuid) {
//                             caseRecordRole = 'patient';
//                         } else if (nCaseRecord.uuid_doctorOrPharmacist === uuid_doctorOrPharmacist) {
//                             caseRecordRole = 'doctorOrPharmacist';
//                         }
            
//                         res.cookie('caseRecordRole', caseRecordRole, {
//                             secure: secure_cookie,
//                             expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//                         })
//                         return res.status(200).json({ 
//                             caseRecord: caseRecord,
//                             message: "Get case-record successly !",
//                             success: true
//                         })
//                     }
                    
//                 }
//             })
//         }
//     }

//     await svMessage.receiveMessage(`feedback__Uuid_doctorOrPharmacist__via__uuid_user___${_id}`, { unsubscribe: true }, getCaseRecord);
//     svMessage.sendMessage('require__Uuid_doctorOrPharmacist__via__uuid_user', JSON.stringify({ id: _id, uuid_user: userOptions.uuid }));
// })

router.get('/getCaseRecord', Authentication, async (req, res) => {
    const uuid_caseRecord = req.query.uuid_caseRecord;
    const userOptions = req.decodedToken.data;
    const _id = uuidv4();
    
    function getCaseRecord(message) {
        const uuid_doctorOrPharmacist = JSON.parse(message).uuid_doctorOrPharmacist;
        const id = JSON.parse(message).id;
        if (_id === id) {
            let uuid_doctorOrPharmacist_m;
    
            if (uuid_doctorOrPharmacist && uuid_doctorOrPharmacist!==null) {
                uuid_doctorOrPharmacist_m = uuid_doctorOrPharmacist;
            } else {
                uuid_doctorOrPharmacist_m = userOptions.uuid;
            }
    
            caseRecordCRUD.readWithUuidAndFk(uuid_caseRecord, userOptions.uuid, uuid_doctorOrPharmacist_m, (caseRecord, err) => {
                if (err) {
                    logEvents(`${req.url}---${req.method}---${err}`);
                    return res.status(500).send({ 
                        message: "Can't get case-record !",
                        err: err,
                        success: false
                    })
                } else {
                    let caseRecordRole = 'notPermission';
                    if (caseRecord===null) {
                        return res.status(200).send({ 
                            caseRecord: caseRecord,
                            message: "Can't get case-record !",
                            caseRecordRole: caseRecordRole,
                            success: false
                        })
                    } else {
                        const nCaseRecord = {...caseRecord.dataValues};
        
                        if(nCaseRecord.uuid_user === userOptions.uuid) {
                            caseRecordRole = 'patient';
                        } else if (nCaseRecord.uuid_doctorOrPharmacist === uuid_doctorOrPharmacist) {
                            caseRecordRole = 'doctorOrPharmacist';
                        }
            
                        return res.status(200).json({ 
                            caseRecord: caseRecord,
                            message: "Get case-record successly !",
                            caseRecordRole: caseRecordRole,
                            success: true
                        })
                    }        
                }
            })
        }
    }

    await svMessage.receiveMessage(`feedback__Uuid_doctorOrPharmacist__via__uuid_user___${_id}`, { unsubscribe: true }, getCaseRecord);
    svMessage.sendMessage('require__Uuid_doctorOrPharmacist__via__uuid_user', JSON.stringify({ id: _id, uuid_user: userOptions.uuid }));
})

router.get('/getCaseRecordDescription', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;

    caseRecordDescription.readWithFk(uuid_caseRecord, pageNumber, (caseRecordDescription, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record-description !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordDescription: caseRecordDescription,
                message: "Get case-record-description successly !",
                success: true
            })
        }
    })
})

router.get('/getCaseRecordImage', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;

    caseRecordImageCRUD.readWithFk(uuid_caseRecord, pageNumber, (caseRecordImage, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record-image !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordImage: caseRecordImage,
                message: "Get case-record-image successly !",
                success: true
            })
        }
    })
})

router.get('/getCaseRecordImageAll', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;

    caseRecordImageCRUD.readAllWithFk(uuid_caseRecord, pageNumber, (caseRecordImageAll, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record-imageAll !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordImageAll: caseRecordImageAll,
                message: "Get case-record-imageAll successly !",
                success: true
            })
        }
    })
})

router.get('/getCaseRecordVideo', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;

    caseRecordVideo.readWithFk(uuid_caseRecord, pageNumber, (caseRecordVideo, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record-image !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordVideo: caseRecordVideo,
                message: "Get case-record-image successly !",
                success: true
            })
        }
    })
})

router.get('/getCaseRecordPrescription', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;

    caseRecordPrescription.readWithFk(uuid_caseRecord, pageNumber, (caseRecordPrescription, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record-prescription !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordPrescription: caseRecordPrescription,
                message: "Get case-record-prescription successly !",
                success: true
            })
        }
    })
})

router.get('/getCaseRecordMedication', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {

})

router.get('/getCaseRecordMedicationsAll', Authentication, doctorOrPharmacistAndPatientRole, (req, res) => {
    const pageNumber = req.query.pageNumber;
    const uuid_caseRecord = req.query.uuid_caseRecord;

    caseRecordMedication.readAllWithFk(uuid_caseRecord, pageNumber, (caseRecordMedications, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record-medications-all !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                caseRecordMedications: caseRecordMedications,
                message: "Get case-record-medications-all successly !",
                success: true
            })
        }
    })
})

// router.get('/caseRecordPage/getList', Authentication, (req, res) => {
//     const pageIndex = req.query.pageIndex;
//     const pageSize = req.query.pageSize;
//     const uuid_caseRecord = req.query.uuid_caseRecord;
//     caseRecordPage.bulkReadWithFk(uuid_caseRecord, Number(pageIndex), Number(pageSize), (caseRecordPages, err) => {
//         if (err) {
//             logEvents(`${req.url}---${req.method}---${err}`);
//             return res.status(500).send({ 
//                 message: "Can't get case-record page !",
//                 err: err,
//                 success: false
//             })
//         } else {
//             return res.status(200).json({ 
//                 caseRecordPages: caseRecordPages,
//                 message: "Get case-record page successly !",
//                 success: true
//             })
//         }
//     })
// })

router.get('/caseRecord/getLock', Authentication, doctorOrPharmacistAndPatientRole, async (req, res) => {
    const uuid_caseRecord = req.query.uuid_caseRecord;
    const caseRecordLockKey = `redlock-caseRecordLock-${ uuid_caseRecord }`;
    const caseRecordLockKey_dataCache = `caseRecordLock-${ uuid_caseRecord }`;

    const doctorOrPharmacistLock = await serviceRedlock.acquire([caseRecordLockKey], 10000);

    serviceRedis.getData(caseRecordLockKey_dataCache, (caseRecordLockOptions) => {
        doctorOrPharmacistLock.release();
        if (caseRecordLockOptions) {
            return res.status(200).send({
                caseRecordLock: caseRecordLockOptions,
                message: 'post caseRecordLock success',
                success: true
            })
        } else {
            return res.status(200).send({
                message: 'post caseRecordLock NOT success',
                success: false
            })
        }
    })
})


module.exports = router;