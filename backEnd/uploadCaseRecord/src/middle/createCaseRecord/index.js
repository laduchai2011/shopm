'use strict';
const { caseRecord } = require('../../model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordDescription } = require('../../model/CRUDDATABASE/CRUD_CaseRecordDescription');
const { caseRecordImage } = require('../../model/CRUDDATABASE/CRUD_CaseRecordImage');
const { caseRecordVideo } = require('../../model/CRUDDATABASE/CRUD_CaseRecordVideo');
const { caseRecordPrescription } = require('../../model/CRUDDATABASE/CRUD_CaseRecordPrescription');
const { caseRecordPage } = require('../../model/CRUDDATABASE/CRUDCASERECORDPAGE');

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*report: string,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/

/**
*@typedef {
*pageNumber: string,
*images: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/  

/**
*@typedef {
*pageNumber: string,
*videos: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/  

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/  

/**
*@typedef {
*pageNumber: string,
*name: string,
*amount: INTEGER.UNSIGNED,
*note: text,
*price: INTEGER.UNSIGNED,
*discount: FLOAT,
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid,
*uuid_medication: uuid
*} caseRecordMedicationOptions
*/ 

const createCaseRecordDescription = (caseRecordDescriptionOptions) => {
    return new Promise((resolve, reject) => {
        caseRecordDescription.create(caseRecordDescriptionOptions, (caseRecordDescription, err) => {
            if (err) {
                reject(err);
            } else {
                resolve(caseRecordDescription);
            }
        })
    })
}

const createCaseRecordImage = (caseRecordImageOptions) => {
    return new Promise((resolve, reject) => {
        caseRecordImage.create(caseRecordImageOptions, (caseRecordImage, err) => {
            if (err) {
                reject(err);
            } else {
                resolve(caseRecordImage);
            }
        })
    })
}

const createCaseRecordVideo = (caseRecordVideoOptions) => {
    return new Promise((resolve, reject) => {
        caseRecordVideo.create(caseRecordVideoOptions, (caseRecordVideo, err) => {
            if (err) {
                reject(err);
            } else {
                resolve(caseRecordVideo);
            }
        })
    })
}

const createCaseRecordPrescription = (caseRecordPrescriptionOptions) => {
    return new Promise((resolve, reject) => {
        caseRecordPrescription.create(caseRecordPrescriptionOptions, (caseRecordPrescription, err) => {
            if (err) {
                reject(err);
            } else {
                resolve(caseRecordPrescription);
            }
        })
    })
}

const createCaseRecord = (caseRecordData, callback) => { 
    let data = null;
    let err;

    new Promise((resolve, reject) => {
        caseRecord.create(caseRecordData.caseRecordOptions, (caseRecord, err) => {
            if (err) {
                reject(err);
            } else {

                const caseRecordDescriptionOptions = caseRecordData.caseRecordDescriptionOptions;
                const caseRecordImageOptions = caseRecordData.caseRecordImageOptions;
                const caseRecordVideoOptions = caseRecordData.caseRecordVideoOptions;
                const caseRecordPrescriptionOptions = caseRecordData.caseRecordPrescriptionOptions;

                caseRecordDescriptionOptions.uuid_caseRecord = caseRecord.dataValues.uuid_caseRecord;
                caseRecordImageOptions.uuid_caseRecord = caseRecord.dataValues.uuid_caseRecord;
                caseRecordVideoOptions.uuid_caseRecord = caseRecord.dataValues.uuid_caseRecord;
                caseRecordPrescriptionOptions.uuid_caseRecord = caseRecord.dataValues.uuid_caseRecord;

                Promise.all([
                    createCaseRecordDescription(caseRecordDescriptionOptions), 
                    createCaseRecordImage(caseRecordImageOptions), 
                    createCaseRecordVideo(caseRecordVideoOptions),
                    createCaseRecordPrescription(caseRecordPrescriptionOptions)
                ]).then((values) => {
                    data = {
                        caseRecord: values,
                        success: true,
                        message: 'Create case-record successly !'
                    }
                    resolve(data);
                });
            }
        })
    }).then(data => data = data).catch(error => err = error).finally(() => {
        callback(data, err);
    })
}

module.exports = { createCaseRecord }