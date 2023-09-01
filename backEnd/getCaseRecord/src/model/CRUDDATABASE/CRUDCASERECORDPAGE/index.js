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
*page: integer,
*priceTotal: integer,
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

    // create(caseRecordPageOptions, callback) {
    //     let caseRecordPage;
    //     let err;
        
    //     const caseRecordPagePromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const newCaseRecordPage = await this._CaseRecordPage.create(caseRecordPageOptions, { transaction: t });
    //                     resolve(newCaseRecordPage);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     caseRecordPagePromise
    //     .then(newCaseRecordPage => {
    //         caseRecordPage = newCaseRecordPage;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(caseRecordPage, err);
    //     })
    // }

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

    
    bulkReadWithFk(uuid_caseRecord, pageIndex, pageSize, callback) {
        let caseRecordPages;
        let err;
        
        const caseRecordPagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newCaseRecordPages = await this._CaseRecordPage.findAndCountAll({
                            where: {
                                uuid_caseRecord: uuid_caseRecord
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t });
                        resolve(newCaseRecordPages);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPagePromise
        .then(newCaseRecordPages => {
            caseRecordPages = newCaseRecordPages;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordPages, err);
        })
    }
}

const caseRecordPage = new CaseRecordPage();

module.exports = { caseRecordPage }