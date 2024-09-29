'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

    

class Chest {
    constructor() {
        this._Chest = defineModel.getChest();
        this._Chest_CH = defineModel.getChest_CH();
    }

    TKSManagerCreate(chestOptions, uuid_member, callback) {
        let chest;
        let err;
        
        const chestPromise = new Promise(async (resolve, reject) => {
            const chest_t = await sequelize.transaction();
            try {
                const isChest = await this._Chest.create(chestOptions, { transaction: chest_t });

                const chest_CH_Options = {
                    name: isChest.name,
                    title: isChest.title,
                    type: isChest.type,
                    size: isChest.size,
                    maxAmount: isChest.maxAmount,
                    note: isChest.note,
                    status: isChest.status,
                    uuid_member: uuid_member,
                    uuid_chest: isChest.uuid_chest
                }

                const isChest_CH = await this._Chest_CH.create(chest_CH_Options, {transaction: chest_t});

                await chest_t.commit();

                resolve(isChest);   

            } catch (error) {
                await chest_t.rollback();
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