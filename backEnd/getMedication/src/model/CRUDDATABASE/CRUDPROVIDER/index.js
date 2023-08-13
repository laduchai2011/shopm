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

    readList(uuid_user, callback) {
        let providers;
        let err;
        
        const providerPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isProviders = await this._Provider.findAll({
                            where: {
                                uuid_user: uuid_user    
                            }
                        }, { transaction: t })

                        if (isProviders.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isProviders);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        providerPromise
        .then(isProviders => {
            providers = isProviders;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(providers, err);
        })
    }

    read(uuid_provider, callback) {
        let provider;
        let err;
        
        const providerPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isProvider = await this._Provider.findOne({
                            where: {
                                uuid_provider: uuid_provider    
                            },
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }, { transaction: t })

                        resolve(isProvider);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        providerPromise
        .then(isProvider => {
            provider = isProvider;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(provider, err);
        })
    }
}

const crudProvider = new CRUDPROVIDER();

module.exports = { crudProvider }