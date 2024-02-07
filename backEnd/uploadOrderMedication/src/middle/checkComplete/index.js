'use strict';

function isNotCompletedPrescription(req, res, next) {
    const caseRecord = req.caseRecordMid;

    if (caseRecord.status === 'completedPrescription') {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: 'This page is completed prescription !',
            success: false,
            isCompletedPrescription: true,
            checkedType: 'completedPrescription'
        })
    } else {
        next();
    }
}

function isNotCompletedPrescriptionWithDop(req, res, next) {
    const caseRecord = req.caseRecordMid;
    const caseRecordRole = req.caseRecordRole;

    if ((caseRecord.status==='completedPrescription') && (caseRecordRole==='doctorOrPharmacist')) {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: 'This page is completed prescription, doctor or pharmacist cant NOT lock it !',
            success: false,
            isCompletedPrescription: true,
            checkedType: 'completedPrescription'
        })
    } else {
        next();
    }
}

function isNotCompleted(req, res, next) {
    const caseRecord = req.caseRecordMid;

    if (caseRecord.status === 'completed') {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: 'This page is completed !',
            success: false,
            isCompleted: true,
            checkedType: 'completed'
        })
    } else {
        next();
    }
}

function isCompletedPrescription(req, res, next) {
    const caseRecord = req.caseRecordMid;

    if (caseRecord.status === 'completedPrescription') {
        next();
    } else {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: `This page is NOT completed prescription yet !`,
            success: false,
            isCompletedPrescription: false,
            checkedType: 'completedPrescription'
        })
    }
}

function isCompleted(req, res, next) {
    const caseRecord = req.caseRecordMid;

    if (caseRecord.status === 'completed') {
        next();
    } else {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: `This page is NOT completed yet !`,
            success: false,
            isCompleted: false,
            checkedType: 'completed'
        })
    }
}

function isCompletedOrIsCompletedPrescription(req, res, next) {
    const caseRecord = req.caseRecordMid;

    if ((caseRecord.status==='completed') || (caseRecord.status === 'completedPrescription')) {
        next();
    } else {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: `This page is NOT completed or NOT is completed prescription yet !`,
            success: false,
            isCompletedOrIsCompletedPrescription: false,
            checkedType: 'completedOrCompletedPrescription'
        })
    }
}

function isDoctorOrPharmacistRequirePrescriptionAgain(req, res, next) {
    const caseRecord = req.caseRecordMid;

    if (caseRecord.status==='doctorOrPharmacistRequirePrescriptionAgain') {
        next();
    } else {
        return res.status(200).json({ 
            caseRecord: caseRecord,
            message: `This page is NOT doctor or pharmacist require to prescription again yet !`,
            success: false,
            isDoctorOrPharmacistRequirePrescriptionAgain: false
        })
    }
}

module.exports = { 
    isNotCompletedPrescription, 
    isNotCompletedPrescriptionWithDop,
    isNotCompleted, 
    isCompletedPrescription, 
    isCompleted,
    isCompletedOrIsCompletedPrescription,
    isDoctorOrPharmacistRequirePrescriptionAgain 
}