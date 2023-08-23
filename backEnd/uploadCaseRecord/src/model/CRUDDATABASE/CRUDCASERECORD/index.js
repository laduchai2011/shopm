const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*title: string,
*status: string,
*report: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

class CaseRecord {
    constructor() {
        this._CaseRecord = defineModel.getCaseRecord();
    }

    create(caseRecordOptions, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newCaseRecord = await this._CaseRecord.create(caseRecordOptions, { transaction: t });
                        resolve(newCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(newCaseRecord => {
            caseRecord = newCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    // update(uuid_orderAllMedication, orderAllMedicationOptions, callback) {
    //     let orderAllMedication;
    //     let err;
        
    //     const orderAllMedicationPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const newOrderAllMedication = await this._OrderAllMedication.update(orderAllMedicationOptions, {
    //                         where: {
    //                             uuid_orderAllMedication: uuid_orderAllMedication
    //                         }
    //                     }, { transaction: t });
    //                     resolve(newOrderAllMedication);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     orderAllMedicationPromise
    //     .then(newOrderAllMedication => {
    //         orderAllMedication = newOrderAllMedication;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(orderAllMedication, err);
    //     })
    // }
}

const caseRecord = new CaseRecord();

module.exports = { caseRecord }