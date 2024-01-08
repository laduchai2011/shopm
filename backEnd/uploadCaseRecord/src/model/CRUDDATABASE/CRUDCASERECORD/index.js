const { Op, where } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');
const { options } = require('../../../../router');

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

    patchStatusCRC(uuid_caseRecord, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    status: 'notYetCreate'
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.status = 'notComplete';
                        await isCaseRecord.save({ transaction:t });
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

    updateDoctorPharmacist(uuid_user, uuid_caseRecord, uuid_doctorOrPharmacist, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    uuid_user: uuid_user
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.uuid_doctorOrPharmacist = uuid_doctorOrPharmacist;
                        await isCaseRecord.save({ transaction:t });
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

    sendRequireToDoctorPharmacist(uuid_user, uuid_caseRecord, uuid_doctorOrPharmacist, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord,
                            {
                                where: {
                                    uuid_user: uuid_user
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.status = 'wait';
                        isCaseRecord.uuid_doctorOrPharmacist = uuid_doctorOrPharmacist;
                        await isCaseRecord.save({ transaction:t });
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
}

const caseRecordCRUD = new CaseRecord();

module.exports = { caseRecordCRUD }