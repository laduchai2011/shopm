const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*name: string, 
*avatar: string,
*banner: string,
*follow: integer,
*averageRating: float,
*rateCount: integer
*} providerOptions
*/

class CRUDPROVIDER {
    constructor() {
        this._Provider = defineModel.getProvider();
    }

    create(providerOptions, callback) {
        let provider;
        let err;
        
        const userPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newProvider = await this._Provider.create(providerOptions, { transaction: t })
                        resolve(newProvider);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        userPromise
        .then(newProvider => {
            provider = newProvider
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(provider, err);
        })
    }
}

const crudProvider = new CRUDPROVIDER();

module.exports = { crudProvider }