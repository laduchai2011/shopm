const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*title: string,
*avatar: string,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: float,
*note: string,
*catalog: text,
*information: text,
*amount: integer,
*sold: integer,
*discount: float,
*averageRating: float,
*rateCount: integer,
*status: string
*uuid_provider: uuid
*} medicateOptions
*/ 

class Medication {
    constructor() {
        this._Medication = defineModel.getMedication();
    }

    bulkReadFilter_provider(uuid_provider, pageIndex, pageSize, callback) {
        let medications;
        let err;
        
        const medicatePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMedication = await this._Medication.findAndCountAll({
                            where: {
                                uuid_provider: uuid_provider,
                                [Op.not]: { status: 'delete' }
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t })

                        if (isMedication.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isMedication);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        medicatePromise
        .then(isMedication => {
            medications = isMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medications, err);
        })
    }

    bulkReadFilter_home(pageIndex, pageSize, callback) {
        let medications;
        let err;
        
        const medicatePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMedication = await this._Medication.findAndCountAll({
                            where: {
                                [Op.not]: { status: 'delete' }
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t })

                        if (isMedication.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isMedication);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        medicatePromise
        .then(isMedication => {
            medications = isMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medications, err);
        })
    }

    readWithUid(uuid_medication, callback) {
        let medication;
        let err;
        
        const medicatePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMedication = await this._Medication.findOne({
                            where: {
                                uuid_medication: uuid_medication,
                                [Op.not]: { status: 'delete' }
                            },
                        }, { transaction: t })

                        resolve(isMedication); 
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        medicatePromise
        .then(isMedication => {
            medication = isMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(medication, err);
        })
    }
}

const medicationCRUD = new Medication();

module.exports = { medicationCRUD }