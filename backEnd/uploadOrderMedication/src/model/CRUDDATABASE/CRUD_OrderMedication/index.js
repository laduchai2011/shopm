const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*name: string,
*amount: string,
*costTotal: float,
*note: text,
*status: string,
*uuid_departmentMedication: uuid,
*uuid_orderMedicationGroup: uuid
*} orderMedicationOptions
*/ 

/**
*@typedef {
*name: string,
*amount: string,
*price: float,
*discount: float,
*cost: float,
*note: text,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationMedicationOptions
*/ 

/**
*@typedef {
*description: TEXT,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationDescriptionOptions
*/ 

/**
*@typedef {
*title: string,
*imageUrl: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationImageOptions
*/

/**
*@typedef {
*title: string,
*videoUrl: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationVideoOptions
*/

/**
*@typedef {
*prescription: TEXT,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationPrescriptionOptions
*/ 

/**
*@typedef {
*step: string,              cart - order - confirm - transport - receive
*isCompleted: text,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationStepByStepOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*cost: float,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationTransportOptions
*/ 
    
/**
*@typedef {
*type: string,
*information: text,
*cost: float,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationPaymentOptions
*/ 
    


class ORDERMEDICATION {
    constructor() {
        this._OrderMedication = defineModel.getOrderMedication();
        this._OrderMedicationMedication = defineModel.getOrderMedicationMedication();
        this._OrderMedicationDescription = defineModel.getOrderMedicationDescription();
        this._OrderMedicationImage = defineModel.getOrderMedicationImage();
        this._OrderMedicationVideo = defineModel.getOrderMedicationVideo();
        this._OrderMedicationPrescription= defineModel.getOrderMedicationPrescription();
        this._OrderMedicationStepByStep = defineModel.getOrderMedicationStepByStep();
        this._OrderMedicationTransport = defineModel.getOrderMedicationTransport();
        this._OrderMedicationPayment = defineModel.getOrderMedicationPayment();
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

    createWithCaseRecord(orderMedicationFromCaseRecordOptions, callback) {
        let orderMedication;
        let err;

        const orderMedicationPromise = new Promise(async (resolve, reject) => {
            const orderMedication_t = await sequelize.transaction();
            try {
                const newOrderMedication_m = await this._OrderMedication.create(orderMedicationFromCaseRecordOptions.orderMedicationOptions, { transaction: orderMedication_t });

                const newOrderMedication = newOrderMedication_m.dataValues;


                const orderMedicationMedicationOptionsArray = orderMedicationFromCaseRecordOptions.orderMedicationMedicationOptionsArray;
                for (let i = 0; i < orderMedicationMedicationOptionsArray.length; i++) {
                    orderMedicationMedicationOptionsArray[i].uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                }
                const newOrderMedicationMedicationArray = await this._OrderMedicationMedication.bulkCreate(orderMedicationMedicationOptionsArray, { transaction: orderMedication_t });

                const orderMedicationDescriptionOptions = orderMedicationFromCaseRecordOptions.orderMedicationDescriptionOptions;
                orderMedicationDescriptionOptions.uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                const newOrderMedicationDescription = await this._OrderMedicationDescription.create(orderMedicationDescriptionOptions, { transaction: orderMedication_t });

                const orderMedicationImageOptionsArray = orderMedicationFromCaseRecordOptions.orderMedicationImageOptionsArray;
                for (let i = 0; i < orderMedicationImageOptionsArray.length; i++) {
                    orderMedicationImageOptionsArray[i].uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                }
                const newOrderMedicationImageArray = await this._OrderMedicationImage.bulkCreate(orderMedicationImageOptionsArray, { transaction: orderMedication_t });

                const orderMedicationVideoOptionsArray = orderMedicationFromCaseRecordOptions.orderMedicationVideoOptionsArray;
                for (let i = 0; i < orderMedicationImageOptionsArray.length; i++) {
                    orderMedicationVideoOptionsArray[i].uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                }
                const newOrderMedicationVideoArray = await this._OrderMedicationVideo.bulkCreate(orderMedicationVideoOptionsArray, { transaction: orderMedication_t });

                const orderMedicationPrescriptionOptions = orderMedicationFromCaseRecordOptions.orderMedicationPrescriptionOptions;
                orderMedicationPrescriptionOptions.uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                const newOrderMedicationPrescription = await this._OrderMedicationDescription.create(orderMedicationPrescriptionOptions, { transaction: orderMedication_t });

                const orderMedicationStepByStepOptionsArray = [
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
                const newOrderMedicationStepBySteps = await this._OrderMedicationStepByStep.bulkCreate(orderMedicationStepByStepOptionsArray, { transaction: orderMedication_t });
            
                // const orderMedicationTransportOptions = {
                //     type: 'normal',
                //     information: 'NOT',
                //     cost: 100,
                //     status: 'normal',
                //     uuid_orderMedication: newOrderMedication.uuid_orderMedication
                // }
                const orderMedicationTransportOptions = orderMedicationFromCaseRecordOptions.orderMedicationTransportOptions;
                orderMedicationTransportOptions.uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                const newOrderMedicationTransport = await this._Transport.create(orderMedicationTransportOptions, { transaction: orderMedication_t });

                // const orderMedicationPaymentOptions = {
                //     type: 'cash',
                //     information: 'NOT',
                //     cost: 500,
                //     status: 'normal',
                //     uuid_orderMedication: newOrderMedication.uuid_orderMedication
                // }
                const orderMedicationPaymentOptions = orderMedicationFromCaseRecordOptions.orderMedicationPaymentOptions;
                orderMedicationPaymentOptions.uuid_orderMedication = newOrderMedication.uuid_orderMedication;
                const newOrderMedicationPayment = await this._PaymentMedication.create(orderMedicationPaymentOptions, { transaction: orderMedication_t });
            
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