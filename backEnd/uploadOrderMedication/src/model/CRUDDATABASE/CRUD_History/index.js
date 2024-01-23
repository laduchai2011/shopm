const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*step: string,
*isCompleted: text,
*status: string,
*uuid_orderMedication: uuid,
*uuid_user: uuid
*} historyOptions
*/ 

class HISTORY {
    constructor() {
        this._History = defineModel.getHistory();
    }

    create(historyOptions, callback) {
        let historyOptions;
        let err;
        
        const historyPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newHistory = await this._History.create(historyOptions, { transaction: t });
                        resolve(newHistory);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        historyPromise
        .then(newHistory => {
            historyOptions = newHistory;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(historyOptions, err);
        })
    }

    // update(uuid_orderAllMedication, orderAllMedicationOptions, callback) {
    //     let orderAllMedication;
    //     let err;
        
    //     const orderAllMedicationPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const newOrderAllMedication = await this._OrderAllMedication.update(orderAllMedicationOptions, {
    //                         where: {
    //                             uuid_orderAllMedication: uuid_orderAllMedication
    //                         }
    //                     }, { transaction: t });
    //                     resolve(newOrderAllMedication);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     orderAllMedicationPromise
    //     .then(newOrderAllMedication => {
    //         orderAllMedication = newOrderAllMedication;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(orderAllMedication, err);
    //     })
    // }
}

const historyCRUD = new HISTORY();

module.exports = { historyCRUD }