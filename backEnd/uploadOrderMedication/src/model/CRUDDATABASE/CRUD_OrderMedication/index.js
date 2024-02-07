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
        this._History = defineModel.getHistory();
        this._Transport = defineModel.getTransport();
        this._PaymentMedication = defineModel.getPaymentMedication();
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
                                    // [Op.not]: {
                                    //     [Op.or]: [
                                    //         { status: 'notYetCreate' },
                                    //         { status: 'delete' }
                                    //     ]
                                    // },
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

    create(orderMedicationOptions, callback) {
        let orderMedication;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedication = await this._OrderMedication.create(orderMedicationOptions, { transaction: t });
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

    createWithCaseRecord(orderMedicationOptions, callback) {
        let orderMedication;
        let err;

        const orderMedicationPromise = new Promise(async (resolve, reject) => {
            const orderMedication_t = await sequelize.transaction();
            try {
                const newOrderMedication_m = await this._OrderMedication.create(orderMedicationOptions, { transaction: orderMedication_t });

                const newOrderMedication = newOrderMedication_m.dataValues;

                const historyOptionsArray = [
                    {
                        step: 'cart',
                        isCompleted: true,
                        status: 'normal',
                        uuid_orderMedication: newOrderMedication.uuid_orderMedication
                    },
                    {
                        step: 'order',
                        isCompleted: true,
                        status: 'normal',
                        uuid_orderMedication: newOrderMedication.uuid_orderMedication
                    },
                    {
                        step: 'confirm',
                        isCompleted: false,
                        status: 'normal',
                        uuid_orderMedication: newOrderMedication.uuid_orderMedication
                    },
                    {
                        step: 'transport',
                        isCompleted: false,
                        status: 'normal',
                        uuid_orderMedication: newOrderMedication.uuid_orderMedication
                    },
                    {
                        step: 'receive',
                        isCompleted: false,
                        status: 'normal',
                        uuid_orderMedication: newOrderMedication.uuid_orderMedication
                    }
                ]
                const newHistorys = await this._History.bulkCreate(historyOptionsArray, { transaction: orderMedication_t });
            
                const transportOptions = {
                    type: 'normal',
                    information: 'NOT',
                    status: 'normal',
                    uuid_orderMedication: newOrderMedication.uuid_orderMedication
                }
                const newTransport = await this._Transport.create(transportOptions, { transaction: orderMedication_t });

                const paymentMedicationOptions = {
                    type: 'cash',
                    information: 'NOT',
                    status: 'normal',
                    uuid_orderMedication: newOrderMedication.uuid_orderMedication
                }
                const newPaymentMedication = await this._PaymentMedication.create(paymentMedicationOptions, { transaction: orderMedication_t });
            
                // const newUpdateOrderMedication = await this._OrderMedication.findByPk(
                //     newOrderMedication.uuid_orderMedication, 
                //     {
                //         where: {
                //             status: 'notYetCreate'
                //         }
                //     },
                //     { limit: 1, lock: true, transaction: orderMedication_t }
                // );
                // newUpdateOrderMedication.status = 'normal';
                // await newUpdateOrderMedication.save({ transaction: orderMedication_t });
                
                await orderMedication_t.commit();

                resolve(newOrderMedication); 
            } catch (error) {
                await orderMedication_t.rollback();
                reject(error);
            }
        })

        orderMedicationPromise
        .then(newUpdateOrderMedication => {
            orderMedication = newUpdateOrderMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderMedication, err);
        })
    }

    completeToCreateWithCaseRecord(orderMedicationOptions, callback) {
        let orderMedication;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedication = await this._OrderMedication.findByPk(
                            orderMedicationOptions?.uuid_orderMedication, 
                            {
                                where: {
                                    status: 'notYetCreate'
                                }
                            },
                            { transaction: t }
                        );
                        newOrderMedication.status = 'normal';
                        await newOrderMedication.save({ transaction:t });
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

    bulkCreate(orderMedicationOptionsList, callback) {
        let orderMedications;
        let err;
        
        const orderMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedications = await this._OrderMedication.bulkCreate(orderMedicationOptionsList, { transaction: t });
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