const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*title: string,
*type: string,
*pageNumber: string,
*status: string,
*uuid_caseRecord: uuid,
*uuid_orderMyself: uuid,
*uuid_user: uuid
*} orderMedicationOptions
*/ 

class ORDERMEDICATION {
    constructor() {
        this._OrderMedication = defineModel.getOrderMedication();
    }

    read(uuid_orderMedication, callback) {
        let orderMedication;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedication = await this._OrderMedication.findByPk(
                            uuid_orderMedication, 
                            {
                                where: {
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'notYetCreate' },
                                            { status: 'delete' }
                                        ]
                                    }
                                }
                            },
                            { transaction: t }
                        );
                        resolve(newOrderMedication);  
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        orderMedicationPromise
        .then(newOrderMedication => {
            orderMedication = newOrderMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderMedication, err);
        })
    }

    readWithUuid(uuid_orderMedication, callback) {
        let orderMedication;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedication = await this._OrderMedication.findByPk(
                            uuid_orderMedication,
                            {
                                where: {
                                    [Op.or]: [
                                        {[Op.not]: { status: 'notYetCreate' }},
                                        {[Op.not]: { status: 'delete' }}
                                    ]
                                }
                            },
                            { transaction: t }
                        );
                        resolve(newOrderMedication);  
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        orderMedicationPromise
        .then(newOrderMedication => {
            orderMedication = newOrderMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderMedication, err);
        })
    }

    readWithCaseRecord(uuid_caseRecord, pageNumber, callback) {
        let orderMedication;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedication = await this._OrderMedication.findOne(
                            {
                                where: {
                                    pageNumber: pageNumber,
                                    uuid_caseRecord: uuid_caseRecord,
                                    [Op.or]: [
                                        {[Op.not]: { status: 'notYetCreate' }},
                                        {[Op.not]: { status: 'delete' }}
                                    ]
                                }
                            },
                            { transaction: t }
                        );
                        resolve(newOrderMedication);  
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        orderMedicationPromise
        .then(newOrderMedication => {
            orderMedication = newOrderMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderMedication, err);
        })
    }

    bulkRead(uuid_orderAllMedication, callback) {
        let orderMedications;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedications = await this._OrderMedication.findAll({
                            where: {
                                uuid_orderAllMedication: uuid_orderAllMedication,
                                [Op.not]: {
                                    [Op.or]: [
                                        { status: 'notYetCreate' },
                                        { status: 'delete' }
                                    ]
                                }
                            }
                        }, { transaction: t });
                        resolve(newOrderMedications);  
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        orderMedicationPromise
        .then(newOrderMedications => {
            orderMedications = newOrderMedications;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderMedications, err);
        })
    }
}

const orderMedicationCRUD = new ORDERMEDICATION();

module.exports = { orderMedicationCRUD }