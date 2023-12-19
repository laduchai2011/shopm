'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

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

class CaseRecordMedication {
    constructor() {
        this._CaseRecordMedication = defineModel.getCaseRecordMedication();
    }

    readAllWithFk(uuid_caseRecord, pageNumber, callback) {
        let caseRecordMedications;
        let err;
        
        const caseRecordMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordMedications = await this._CaseRecordMedication.findAll({
                            where: {
                                pageNumber: pageNumber,
                                uuid_caseRecord: uuid_caseRecord,
                            },
                            order: [
                                ['id', 'DESC']
                            ]
                        }, { transaction: t });
                        resolve(isCaseRecordMedications);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordMedicationPromise
        .then(isCaseRecordMedications => {
            caseRecordMedications = isCaseRecordMedications;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordMedications, err);
        })
    }
}

const caseRecordMedication = new CaseRecordMedication();

module.exports = { caseRecordMedication }