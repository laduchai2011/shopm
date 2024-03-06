const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} paymentMedicationOptions
*/ 

class PAYMENTMEDICATION {
    constructor() {
        this._PaymentMedication = defineModel.getPaymentMedication();
    }

    readWithFk(uuid_orderMedication, callback) {
        let paymentMedication;
        let err;
        
        const paymentMedicationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newPaymentMedication = await this._PaymentMedication.findOne(
                            {
                                where: {
                                    uuid_orderMedication: uuid_orderMedication,
                                    [Op.or]: [
                                        {[Op.not]: { status: 'delete' }}
                                    ]
                                }
                            },
                            { transaction: t }
                        );
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

const paymentMedicationCRUD = new PAYMENTMEDICATION();

module.exports = { paymentMedicationCRUD }