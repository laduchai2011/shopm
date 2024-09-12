'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class ChestGroup {
    constructor() {
        this._chestGroup = defineModel.getChestGroup();
    }

    create(chestGroupOptions, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChestGroup = await this._chestGroup.create(
                            chestGroupOptions,
                            { transaction: t }
                        );
                        resolve(isChestGroup);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        chestGroupPromise
        .then(isCaseRecord => {
            chestGroup = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestGroup, err);
        })
    }

    read(uuid_chestGroup, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChestGroup = await this._chestGroup.findOne(
                            {
                                where: {
                                    uuid_chestGroup: uuid_chestGroup
                                }
                            },
                            { transaction: t }
                        );
                        resolve(isChestGroup);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        chestGroupPromise
        .then(isCaseRecord => {
            chestGroup = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestGroup, err);
        })
    }

    patchNoteOfChestGroupWhenCustom(uuid_chestGroup, note, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChestGroup = await this._chestGroup.findOne(
                            {
                                where: {
                                    uuid_chestGroup: uuid_chestGroup,
                                }
                            },
                            { lock: true, transaction: t }
                        );
                        isChestGroup.note = note;
                        await isChestGroup.save({ transaction: t });
                        resolve(isChestGroup);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        chestGroupPromise
        .then(isCaseRecord => {
            chestGroup = isCaseRecord;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestGroup, err);
        })
    }
}

const chestGroupCRUD = new ChestGroup();

module.exports = { chestGroupCRUD }