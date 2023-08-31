const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/  

class CaseRecord {
    constructor() {
        this._CaseRecord = defineModel.getCaseRecord();
    }

    // create(caseRecordOptions, callback) {
    //     let caseRecord;
    //     let err;
        
    //     const caseRecordPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const newCaseRecord = await this._CaseRecord.create(caseRecordOptions, { transaction: t });
    //                     resolve(newCaseRecord);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     caseRecordPromise
    //     .then(newCaseRecord => {
    //         caseRecord = newCaseRecord;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(caseRecord, err);
    //     })
    // }

    readWithUuidAndFk(uuid_caseRecord, uuid_user, uuid_doctorOrPharmacist, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findOne({
                            where: {
                                [Op.or]: [
                                    {[Op.and]: {
                                        uuid_caseRecord: uuid_caseRecord,
                                        uuid_user: uuid_user
                                    }},
                                    {[Op.and]: {
                                        uuid_caseRecord: uuid_caseRecord,
                                        uuid_doctorOrPharmacist: uuid_doctorOrPharmacist
                                    }}
                                ]
                            },
                            attributes: {
                                exclude: ['report']
                            }
                        }, { transaction: t });
                        resolve(isCaseRecord);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecord => {
            caseRecord = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecord, err);
        })
    }

    bulkReadWithFk(uuid_user, pageIndex, pageSize, callback) {
        let caseRecords;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecords = await this._CaseRecord.findAndCountAll({
                            where: {
                                uuid_user: uuid_user
                            },
                            attributes: {
                                exclude: ['report']
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t });
                        resolve(isCaseRecords);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordPromise
        .then(isCaseRecords => {
            caseRecords = isCaseRecords;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecords, err);
        })
    }
}

const caseRecord = new CaseRecord();

module.exports = { caseRecord }