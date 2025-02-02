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

class Provider {
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
                                uuid_user: uuid_user,
                                [Op.not]: {
                                    status: 'delete'
                                }    
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

    read__uuid_user(uuid_provider, callback) {
        let provider;
        let err;

        const providerPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isProvider = await this._Provider.findOne(
                            {
                                where: {
                                    uuid_provider,
                                    [Op.not]: {
                                        status: 'delete'
                                    }
                                },
                                attributes: ['uuid_user']
                            },
                            { transaction: t }
                        )
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

const providerCRUD = new Provider();

module.exports = { providerCRUD }