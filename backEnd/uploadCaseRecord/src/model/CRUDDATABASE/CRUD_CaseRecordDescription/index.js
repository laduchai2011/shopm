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

    create(caseRecordDescriptionOptions, callback) {
        let caseRecordDescription;
        let err;
        
        const caseRecordDescriptionPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordDescription = await this._CaseRecordDescription.create(caseRecordDescriptionOptions, { transaction: t });
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

    updateWithCaseRecord(uuid_caseRecordDescription, description, callback) {
        let caseRecordDescription;
        let err;
        
        const caseRecordDescriptionPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordDescription = await this._CaseRecordDescription.findByPk(
                            uuid_caseRecordDescription,
                            {
                                where: {
                                    [Op.not]: {
                                        status: 'complete'
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordDescription.description = description;
                        isCaseRecordDescription.status = 'edit';
                        await isCaseRecordDescription.save({ transaction:t });
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