const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*note: text,
*history: string,
*total: float,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} orderAllMedicationOptions
*/ 

class ORDERALLMEDICATION {
    constructor() {
        this._OrderAllMedication = defineModel.getOrderAllMedication();
    }

    create(orderAllMedicationOptions, callback) {
        let orderAllMedication;
        let err;
        
        const orderAllMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderAllMedication = await this._OrderAllMedication.create(orderAllMedicationOptions, { transaction: t });
                        resolve(newOrderAllMedication);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        orderAllMedicationPromise
        .then(newOrderAllMedication => {
            orderAllMedication = newOrderAllMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderAllMedication, err);
        })
    }

    update(uuid_orderAllMedication, orderAllMedicationOptions, callback) {
        let orderAllMedication;
        let err;
        
        const orderAllMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderAllMedication = await this._OrderAllMedication.update(orderAllMedicationOptions, {
                            where: {
                                uuid_orderAllMedication: uuid_orderAllMedication
                            }
                        }, { transaction: t });
                        resolve(newOrderAllMedication);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        orderAllMedicationPromise
        .then(newOrderAllMedication => {
            orderAllMedication = newOrderAllMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderAllMedication, err);
        })
    }
}

const orderAllMedication = new ORDERALLMEDICATION();

module.exports = { orderAllMedication }