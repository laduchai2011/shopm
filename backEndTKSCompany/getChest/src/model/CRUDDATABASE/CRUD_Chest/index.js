'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

    

class Chest {
    constructor() {
        this._ChestGroup = defineModel.getChestGroup();
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

    // readChestGroupList(uuid_chestGroup, pageIndex, pageSize, callback) {
    //     let chestGroupList;
    //     let err;
        
    //     const chestGroupPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const isChestGroupList = await this._ChestGroup.findAndCountAll({
    //                         where: {
    //                             uuid_chestGroup: uuid_chestGroup,
    //                             [Op.not]: {
    //                                 [Op.or]: [
    //                                     { status: 'delete' }
    //                                 ]
    //                             }
    //                         },
    //                         attributes: {
    //                             exclude: ['note']
    //                         },
    //                         order: [
    //                             ['id', 'DESC']
    //                         ],
    //                         offset: pageSize * (pageIndex - 1)
    //                     }, { transaction: t });
    //                     resolve(isChestGroupList);   
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })

    //     chestGroupPromise
    //     .then(isChestGroupList => {
    //         chestGroupList = isChestGroupList;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(chestGroupList, err);
    //     })
    // }

    readChestGroup(uuid_chestGroup, callback) {
        let chestGroup;
        let err;
        
        const chestGroupPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isChestGroup = await this._ChestGroup.findByPk(
                            uuid_chestGroup,
                            {
                                where: {
                                    uuid_chestGroup: uuid_chestGroup,
                                    [Op.not]: {
                                        [Op.or]: [
                                            { status: 'delete' }
                                        ]
                                    }
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
        })

        chestGroupPromise
        .then(isChestGroup => {
            chestGroup = isChestGroup;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(chestGroup, err);
        })
    }

}

const chestCRUD = new Chest();

module.exports = { chestCRUD }