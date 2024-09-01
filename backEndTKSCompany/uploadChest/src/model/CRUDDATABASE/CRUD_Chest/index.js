'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

    

class Chest {
    constructor() {
        this._ChestGroup = defineModel.getChestGroup();
        this._ChestGroup_CH = defineModel.getChestGroup_CH();
        this._Chest = defineModel.getChest();
    }

    createChestGroup(chestGroupOptions, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const ischestGroup = await this._ChestGroup.create(chestGroupOptions, { transaction: t });
                        resolve(ischestGroup);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })

        chestGroupPromise
        .then(ischestGroup => {
            chestGroup = ischestGroup;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestGroup, err);
        })
    }

    patchChestGroup(uuid_chestGroup, chestGroupOptions, uuid_member, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise(async (resolve, reject) => {
            const chestGroup_t = await sequelize.transaction();
            try {
                const isChestGroup = await this._ChestGroup.findByPk(
                    uuid_chestGroup,
                    {
                        where: {
                            [Op.not]: {
                                [Op.or]: [
                                    { status: 'delete' }
                                ]
                            }
                        }
                    },
                    { limit: 1, lock: true, transaction: chestGroup_t },
                );
                isChestGroup.name = chestGroupOptions.name;
                isChestGroup.title = chestGroupOptions.title;
                isChestGroup.address = chestGroupOptions.address;
                isChestGroup.note = chestGroupOptions.note;
                await isChestGroup.save({ transaction: chestGroup_t });

                const chestGroup_CH_Options = {
                    name: chestGroupOptions.name,
                    title: chestGroupOptions.title,
                    address: chestGroupOptions.address,
                    note: chestGroupOptions.note,
                    status: 'normal',
                    uuid_member: uuid_member,
                    uuid_chestGroup: uuid_chestGroup
                }

                const isChestGroup_CH = await this._ChestGroup_CH.create(chestGroup_CH_Options, {transaction: chestGroup_t});

                await chestGroup_t.commit();

                resolve(isChestGroup);   

            } catch (error) {
                await chestGroup_t.rollback();
                reject(error);
            }
        });

        chestGroupPromise
        .then(isChestGroup => {
            chestGroup = isChestGroup;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestGroup, err);
        })
    }
    
    createChest(chestOptions, callback) {
        let chest;
        let err;
        
        const chestPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const ischest = await this._Chest.create(chestOptions, { transaction: t });
                        resolve(ischest);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })

        chestPromise
        .then(ischest => {
            chest = ischest;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chest, err);
        })
    }

}

const chestCRUD = new Chest();

module.exports = { chestCRUD }