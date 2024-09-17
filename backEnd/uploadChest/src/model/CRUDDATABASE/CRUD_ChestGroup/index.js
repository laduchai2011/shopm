'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

class ChestGroup {
    constructor() {
        this._ChestGroup = defineModel.getChestGroup();
    }

    create(chestGroupOptions, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChestGroup = await this._ChestGroup.create(
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
                        const isChestGroup = await this._ChestGroup.findOne(
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
                        const isChestGroup = await this._ChestGroup.findOne(
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

    TKSManagerPatchChestGroup(uuid_chestGroup, chestGroupOptions, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChestGroup = await this._ChestGroup.findOne(
                            {
                                where: {
                                    uuid_chestGroup: uuid_chestGroup,
                                }
                            },
                            { limit: 1, lock: true, transaction: t }
                        );
                        isChestGroup.name = chestGroupOptions.name;
                        isChestGroup.title = chestGroupOptions.title;
                        isChestGroup.address = chestGroupOptions.address;
                        isChestGroup.note = chestGroupOptions.note;
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