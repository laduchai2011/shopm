const { Op, where } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');
const { options } = require('../../../../router');

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*currentPage: string,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/ 

class CaseRecord {
    constructor() {
        this._CaseRecord = defineModel.getCaseRecord();
        this._CaseRecordDescription = defineModel.getCaseRecordDescription();
        this._CaseRecordImage = defineModel.getCaseRecordImage();
        this._CaseRecordPrescription = defineModel.getCaseRecordPrescription();
        this._CaseRecordMedication = defineModel.getCaseRecordMedication();
    }

    read(uuid_caseRecord, callback) {
        let caseRecord;
        let err;
        
        const caseRecordPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecord = await this._CaseRecord.findByPk(
                            uuid_caseRecord, 
                            { transaction: t }
                        );
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

    completedPrescription(uuid_caseRecord, callback) {
        let caseRecord;
        let err;

        const caseRecordPromise = new Promise(async (resolve, reject) => {
            const caseRecord_t = await sequelize.transaction();
            try {
                const isCaseRecordDescription = await this._CaseRecordDescription.findOne(
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecordDescription.status = 'completed';
                await isCaseRecordDescription.save({ transaction: caseRecord_t });

                const isCaseRecordImage = await this._CaseRecordImage.update({
                    status: 'completed'
                },
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                // isCaseRecordImage.status = 'completed';
                // await isCaseRecordImage.save({ transaction:t });

                const isCaseRecordPrescription = await this._CaseRecordPrescription.findOne(
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecordPrescription.status = 'completed';
                await isCaseRecordPrescription.save({ transaction: caseRecord_t });

                const isCaseRecordMedication = await this._CaseRecordMedication.update({
                    status: 'completed'
                },
                    {
                        where: {
                            uuid_caseRecord: uuid_caseRecord,
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                // isCaseRecordMedication.status = 'completed';
                // await isCaseRecordMedication.save({ transaction: caseRecord_t });

                const isCaseRecord = await this._CaseRecord.findByPk(
                    uuid_caseRecord,
                    {
                        where: {
                            status: 'notComplete'
                        }
                    },
                    { limit: 1, lock: true, transaction: caseRecord_t },
                );
                isCaseRecord.status = 'completedPrescription';
                await isCaseRecord.save({ transaction: caseRecord_t });

                await caseRecord_t.commit();

                resolve(isCaseRecord);   

            } catch (error) {
                await caseRecord_t.rollback();
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

    completed(uuid_caseRecord, callback) {
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
                                    status: 'completedPrescription'
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecord.status = 'completed';
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