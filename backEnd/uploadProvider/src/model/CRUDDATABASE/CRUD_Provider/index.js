'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

// /**
// *@typedef {
// *name: string, 
// *avatar: string,
// *banner: string,
// *follow: integer,
// *averageRating: float,
// *rateCount: integer
// *} providerOptions
// */

/**
*@typedef {
*name: string,
*avatar: string,
*banner: text,
*follow: integer,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_user: uuid
*} providerOptions
*/

class Provider {
    constructor() {
        this._Provider = defineModel.getProvider();
    }

    read(uuid_provider, callback) {
        let provider;
        let err;

        const providerPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const provider_c = await this._Provider.findByPk(
                            uuid_provider, 
                            {
                                where: {
                                    [Op.not]: {
                                        status: 'delete'
                                    }
                                }
                            },
                            { transaction: t }
                        )
                        resolve(provider_c);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        providerPromise
        .then(provider_c => {
            provider = provider_c;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(provider, err);
        })
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

    delete(uuid_provider, callback) {
        let provider;
        let err;

        const providerPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const provider_c = await this._Provider.findByPk(
                            uuid_provider,
                            { lock: true, transaction: t },
                        );
                        provider_c.status = 'delete';
                        await provider_c.save({ transaction:t });
                        resolve(provider_c);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        providerPromise
        .then(provider_c => {
            provider = provider_c;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(provider, err);
        })
    }
}

const providerCRUD = new Provider();

module.exports = { providerCRUD }