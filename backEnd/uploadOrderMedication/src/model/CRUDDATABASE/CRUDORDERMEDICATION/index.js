const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*amount: integer,
*uuid_orderAllMedication: uuid,
*uuid_medication: uuid
*} orderMedicationOptions
*/ 

class ORDERMEDICATION {
    constructor() {
        this._OrderMedication = defineModel.getOrderMedication();
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

const orderMedication = new ORDERMEDICATION();

module.exports = { orderMedication }