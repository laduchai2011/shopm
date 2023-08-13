'use strict';
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*tag: string, 
*content: string,
*url: string,
*uuidUser: string
*} userOptions
*/ 

class CRUDIMAGE {
    constructor() {
        this._Image = defineModel.getImage();
    }

    bulkRead(pageIndex, pageSize, callback) {
        let images;
        let err;
        
        const imagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isImage = await this._Image.findAndCountAll({
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t })

                        resolve(isImage)
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        imagePromise
        .then(newImages => {
            images = newImages
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(err, images);
        })
    }

    bulkReadFilter(uuidUser, pageIndex, pageSize, callback) {
        let images;
        let err;
        
        const imagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isImage = await this._Image.findAndCountAll({
                            where: {
                                uuidUser: uuidUser 
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t })

                        resolve(isImage)
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        imagePromise
        .then(newImages => {
            images = newImages
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(err, images);
        })
    }
}

const crudImage = new CRUDIMAGE();

module.exports = { crudImage }