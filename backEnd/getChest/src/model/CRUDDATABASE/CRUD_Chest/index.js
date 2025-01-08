'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class Chest {
    constructor() {
        this._chest = defineModel.getChest();
    }

    sellingRead(all_uuid_chest, pageIndex, pageSize, callback) {
        let chestList;
        let err;
        
        const chestPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChest = await this._chest.findAndCountAll(
                            {
                                where: {
                                    [Op.or]: all_uuid_chest,
                                    [Op.not]: {
                                        uuid_chestGroup: 'delete'
                                    }
                                },
                                order: [
                                    ['id', 'DESC']
                                ],
                                offset: pageSize * (pageIndex - 1),
                                limit: pageSize
                            },
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
            chestList = isChest;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestList, err);
        })
    }
}

const chestCRUD = new Chest();

module.exports = { chestCRUD }