const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*tag: string, 
*content: string,
*url: string,
*uuidUser: string
*} imageOptions
*/ 

class CRUDIMAGE {
    constructor() {
        this._Image = defineModel.getImage();
    }

    create(imageOptions, callback) {
        let image;
        let err;
        
        const imagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newImage = await this._Image.create(imageOptions, { transaction: t });
                        resolve(newImage); 
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        imagePromise
        .then(newImage => {
            image = newImage
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(err, image);
        })
    }

    bulkCreate(imageOptionsArray, callback) {
        let images;
        let err;
        
        const imagePromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newImages = await this._Image.bulkCreate(imageOptionsArray, { transaction: t });
                        resolve(newImages); 
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        imagePromise
        .then(newImage => {
            images = newImage
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(err, images);
        })
    }
}

const crudImage = new CRUDIMAGE();

module.exports = { crudImage }