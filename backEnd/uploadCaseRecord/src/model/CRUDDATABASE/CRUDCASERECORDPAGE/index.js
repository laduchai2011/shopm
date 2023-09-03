const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*dataPage: text,
*priceTotal: integer,
*status: string, 
*uuid_caseRecord: uuid
*} caseRecordPageOptions
*/ 

/**
*@typedef {
*priceTotal: integer,
*status: string,
*description: {
*   note: string,
*   images: [],
*   videos: []
*},
*Prescription: {
*   note: text,
*   medicationList: []    
*}
*} dataPage
*/ 

class CaseRecordPage {
    constructor() {
        this._CaseRecordPage = defineModel.getCaseRecordPage();
    }

    create(caseRecordPageOptions, callback) {
        let caseRecordPage;
        let err;
        
        const caseRecordPagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newCaseRecordPage = await this._CaseRecordPage.create(caseRecordPageOptions, { transaction: t });
                        resolve(newCaseRecordPage);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPagePromise
        .then(newCaseRecordPage => {
            caseRecordPage = newCaseRecordPage;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordPage, err);
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

const caseRecordPage = new CaseRecordPage();

module.exports = { caseRecordPage }