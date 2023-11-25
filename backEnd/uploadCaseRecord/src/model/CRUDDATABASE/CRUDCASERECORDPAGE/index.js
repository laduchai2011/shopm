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
*prescription: {
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

    update_withSickPerson(uuid_caseRecordPage, dataPage,  callback) {
        let caseRecordPage;
        let err;
        
        const caseRecordPagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordPage = await this._CaseRecordPage.findByPk(uuid_caseRecordPage, { lock: true, transaction: t });
                        isCaseRecordPage.dataPage = dataPage;
                        await isCaseRecordPage.save({ transaction:t });
                        resolve(isCaseRecordPage);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPagePromise
        .then(isCaseRecordPage => {
            caseRecordPage = isCaseRecordPage;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordPage, err);
        })
    }
}

const caseRecordPage = new CaseRecordPage();

module.exports = { caseRecordPage }