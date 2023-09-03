const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');


/**
*@typedef {
*dataPage: text,
*uuid_caseRecordPage: uuid
*} caseRecordPageEHOptions
*/ 

class CaseRecordPageEH {
    constructor() {
        this._CaseRecordPageEH = defineModel.getCaseRecordPageEH();
    }

    
    bulkReadWithFk(uuid_caseRecordPage, pageIndex, pageSize, callback) {
        let caseRecordPageEHs;
        let err;
        
        const caseRecordPageEHPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const caseRecordPageEHs = await this._CaseRecordPageEH.findAndCountAll({
                            where: {
                                uuid_caseRecordPage: uuid_caseRecordPage
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t });
                        resolve(caseRecordPageEHs);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPageEHPromise
        .then(caseRecordPageEHs => {
            caseRecordPageEHs = caseRecordPageEHs;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordPageEHs, err);
        })
    }
}

const caseRecordPageEH = new CaseRecordPageEH();

module.exports = { caseRecordPageEH }