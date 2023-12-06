'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/  

class CaseRecordDescription {
    constructor() {
        this._CaseRecordDescription = defineModel.getCaseRecordDescription();
    }

    readWithFk(uuid_caseRecord, pageNumber, callback) {
        let caseRecordDescription;
        let err;
        
        const caseRecordDescriptionPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordDescription = await this._CaseRecordDescription.findOne({
                            where: {
                                pageNumber: pageNumber,
                                uuid_caseRecord: uuid_caseRecord,
                            }
                        }, { transaction: t });
                        resolve(isCaseRecordDescription);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordDescriptionPromise
        .then(isCaseRecordDescription => {
            caseRecordDescription = isCaseRecordDescription;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordDescription, err);
        })
    }
}

const caseRecordDescription = new CaseRecordDescription();

module.exports = { caseRecordDescription }