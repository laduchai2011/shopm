'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/  

class CaseRecordPrescription {
    constructor() {
        this._CaseRecordPrescription = defineModel.getCaseRecordPrescription();
    }

    create(caseRecordPrescriptionOptions, callback) {
        let caseRecordPrescription;
        let err;
        
        const caseRecordPrescriptionPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordPrescription = await this._CaseRecordPrescription.create(caseRecordPrescriptionOptions, { transaction: t });
                        resolve(isCaseRecordPrescription);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPrescriptionPromise
        .then(isCaseRecordPrescription => {
            caseRecordPrescription = isCaseRecordPrescription;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordPrescription, err);
        })
    }

    updateWithCaseRecord(uuid_caseRecordPrescription, prescription, callback) {
        let caseRecordPrescription;
        let err;
        
        const caseRecordPrescriptionPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordPrescription = await this._CaseRecordPrescription.findByPk(
                            uuid_caseRecordPrescription,
                            {
                                where: {
                                    [Op.not]: {
                                        status: 'complete'
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordPrescription.prescription = prescription;
                        isCaseRecordPrescription.status = 'edit';
                        await isCaseRecordPrescription.save({ transaction:t });
                        resolve(isCaseRecordPrescription);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPrescriptionPromise
        .then(isCaseRecordPrescription => {
            caseRecordPrescription = isCaseRecordPrescription;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordPrescription, err);
        })
    }
}

const caseRecordPrescription = new CaseRecordPrescription();

module.exports = { caseRecordPrescription }