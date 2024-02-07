const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*step: string,
*isCompleted: text,
*status: string,
*uuid_orderMedication: uuid
*} historyOptions
*/ 

class HISTORY {
    constructor() {
        this._History = defineModel.getHistory();
    }

    realAll(uuid_orderMedication, callback) {
        let historyOptionsList;
        let err;
        
        const historyPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const histories = await this._History.findAll({
                            where: {
                                uuid_orderMedication: uuid_orderMedication,
                                [Op.not]: {
                                    [Op.or]: [
                                        { status: 'delete' }
                                    ]
                                }
                            }
                        }, { transaction: t });
                        resolve(histories);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        historyPromise
        .then(histories => {
            historyOptionsList = histories;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(historyOptionsList, err);
        })
    }
}

const historyCRUD = new HISTORY();

module.exports = { historyCRUD }