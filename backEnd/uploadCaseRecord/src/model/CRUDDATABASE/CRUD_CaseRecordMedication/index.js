'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*pageNumber: string,
*name: string,
*amount: INTEGER.UNSIGNED,
*note: text,
*price: INTEGER.UNSIGNED,
*discount: FLOAT,
*cost: INTEGER.UNSIGNED,
*status: string,
*uuid_caseRecord: uuid,
*uuid_medication: uuid
*} caseRecordMedicationOptions
*/  

class CaseRecordMedication {
    constructor() {
        this._CaseRecordMedication = defineModel.getCaseRecordMedication();
    }

    create(caseRecordMedicationOptions, callback) {
        let caseRecordMedication;
        let err;
        
        const caseRecordMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordMedication = await this._CaseRecordMedication.create(caseRecordMedicationOptions, { transaction: t });
                        resolve(isCaseRecordMedication);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordMedicationPromise
        .then(isCaseRecordMedication => {
            caseRecordMedication = isCaseRecordMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordMedication, err);
        })
    }

    bulkCreate(caseRecordMedicationOptionsArray, callback) {
        let caseRecordMedications;
        let err;
        
        const caseRecordMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordMedications = await this._CaseRecordMedication.bulkCreate(caseRecordMedicationOptionsArray, { transaction: t });
                        resolve(isCaseRecordMedications);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordMedicationPromise
        .then(isCaseRecordMedications => {
            caseRecordMedications = isCaseRecordMedications;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordMedications, err);
        })
    }

    // updateWithCaseRecord(uuid_caseRecordMedication, amount, note, callback) {
    //     let caseRecordMedication;
    //     let err;
        
    //     const caseRecordMedicationPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const isCaseRecordMedication = await this._CaseRecordPrescription.findByPk(
    //                         uuid_caseRecordMedication,
    //                         { lock: true, transaction: t },
    //                     );
    //                     isCaseRecordMedication.amount = amount;
    //                     isCaseRecordMedication.note = note;
    //                     await isCaseRecordMedication.save({ transaction:t });
    //                     resolve(isCaseRecordMedication);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     caseRecordMedicationPromise
    //     .then(isCaseRecordMedication => {
    //         caseRecordMedication = isCaseRecordMedication;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(caseRecordMedication, err);
    //     })
    // }

    edit(uuid_caseRecordMedication, amount, note, cost, callback) {
        let caseRecordMedication;
        let err;
        
        const caseRecordMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordMedication = await this._CaseRecordMedication.findByPk(
                            uuid_caseRecordMedication,
                            {
                                where: {
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'complete' },
                                            { status: 'delete' }
                                        ]
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordMedication.amount = amount;
                        isCaseRecordMedication.note = note;
                        isCaseRecordMedication.cost = cost;
                        await isCaseRecordMedication.save({ transaction:t });
                        resolve(isCaseRecordMedication);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordMedicationPromise
        .then(isCaseRecordMedication => {
            caseRecordMedication = isCaseRecordMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordMedication, err);
        })
    }

    delete(uuid_caseRecordMedication, callback) {
        let caseRecordMedication;
        let err;
        
        const caseRecordMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        sequelize.transaction(async (t) => {
                            try {
                                const isCaseRecordMedication = await this._CaseRecordMedication.destroy({
                                    where: {
                                        [Op.and]: [
                                            { uuid_caseRecordMedication: uuid_caseRecordMedication },
                                            { [Op.not]: {
                                                [Op.or]: [
                                                    { status: 'complete' },
                                                    { status: 'delete' }
                                                ]
                                            }}
                                        ]
                                    }
                                }, { transaction: t });
                                resolve(isCaseRecordMedication);   
                            } catch (error) {
                                reject(error);
                            }
                        }); 
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordMedicationPromise
        .then(isCaseRecordMedication => {
            caseRecordMedication = isCaseRecordMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordMedication, err);
        })
    }

    complete(uuid_caseRecordMedication, callback) {
        let caseRecordMedication;
        let err;
        
        const caseRecordMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isCaseRecordMedication = await this._CaseRecordMedication.findByPk(
                            uuid_caseRecordMedication,
                            {
                                where: {
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'notComplete' },
                                            { status: 'delete' }
                                        ]
                                    }
                                }
                            },
                            { lock: true, transaction: t },
                        );
                        isCaseRecordMedication.status = 'completed';
                        await isCaseRecordMedication.save({ transaction:t });
                        resolve(isCaseRecordMedication);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        caseRecordMedicationPromise
        .then(isCaseRecordMedication => {
            caseRecordMedication = isCaseRecordMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(caseRecordMedication, err);
        })
    }
}

const caseRecordMedication = new CaseRecordMedication();

module.exports = { caseRecordMedication }