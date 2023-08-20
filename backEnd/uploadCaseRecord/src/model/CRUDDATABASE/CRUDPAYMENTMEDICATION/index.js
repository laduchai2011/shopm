const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*type: string,
*information: text,
*uuid_orderAllMedication: uuid
*} paymentMedicationOptions
*/ 

class PAYMENTMEDICATION {
    constructor() {
        this._PaymentMedication = defineModel.getPaymentMedication();
    }

    create(paymentMedicationOptions, callback) {
        let paymentMedication;
        let err;
        
        const paymentMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newPaymentMedication = await this._PaymentMedication.create(paymentMedicationOptions, { transaction: t });
                        resolve(newPaymentMedication); 
                    } catch (error) {
                        reject(error);
                    }
                });  
            } catch (error) {
                reject(error);
            }
        });

        paymentMedicationPromise
        .then(newPaymentMedication => {
            paymentMedication = newPaymentMedication;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(paymentMedication, err);
        })
    }
}

const paymentMedication = new PAYMENTMEDICATION();

module.exports = { paymentMedication }