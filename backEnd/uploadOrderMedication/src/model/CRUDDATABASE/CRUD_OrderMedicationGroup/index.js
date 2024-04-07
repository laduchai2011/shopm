const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*type: string,
*title: string,
*pageNumber: string,
*status: string,
*uuid_caseRecord: uuid,
*uuid_user: uuid
*} orderMedicationGroupOptions
*/ 

class ORDERMEDICATIONGROUP {
    constructor() {
        this._OrderMedicationGroup = defineModel.getOrderMedicationGroup();
    }

    create(orderMedicationGroupOptions, callback) {
        let orderMedicationGroup;
        let err;
        
        const orderMedicationGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newOrderMedicationGroup = await this._OrderMedicationGroup.create(orderMedicationGroupOptions, { transaction: t });
                        resolve(newOrderMedicationGroup); 
                    } catch (error) {
                        reject(error);
                    }
                });  
            } catch (error) {
                reject(error);
            }
        });

        orderMedicationGroupPromise
        .then(newOrderMedicationGroup => {
            orderMedicationGroup = newOrderMedicationGroup;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(orderMedicationGroup, err);
        })
    }
}

const orderMedicationGroupCRUD = new ORDERMEDICATIONGROUP();

module.exports = { orderMedicationGroupCRUD }