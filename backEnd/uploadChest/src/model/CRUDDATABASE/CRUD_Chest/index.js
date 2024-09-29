'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class Chest {
    constructor() {
        this._Chest = defineModel.getChest();
    }

    TKSManagerCreate(chestOptions, callback) {
        let chest;
        let err;
        
        const chestPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChest = await this._Chest.create(
                            chestOptions,
                            { transaction: t }
                        );
                        resolve(isChest);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        chestPromise
        .then(isChest => {
            chest = isChest;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chest, err);
        })
    }
}

const chestCRUD = new Chest();

module.exports = { chestCRUD }