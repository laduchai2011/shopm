'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

    

class Log {
    constructor() {
        this._Log = defineModel.getLog();
        this._Log_CH = defineModel.getLog_CH;
    }
    
    create(logOptions, callback) {
        let log;
        let err;
        
        const logPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isLog = await this._Chest.create(logOptions, { transaction: t });
                        resolve(isLog);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })

        logPromise
        .then(isLog => {
            log = isLog;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(log, err);
        })
    }
}

const logCRUD = new Log();

module.exports = { logCRUD }