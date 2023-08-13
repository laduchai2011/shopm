const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*subject: string,
*content: string
*} providerAboutOptions
*/ 

class CRUDPROVIDERABOUT {
    constructor() {
        this._ProviderABout = defineModel.getProviderAbout();
    }

    bulkCreate(providerAboutOptionsArray, callback) {
        let providerAbouts;
        let err;
        
        const providerPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isProviderAbouts = await this._ProviderABout.bulkCreate(providerAboutOptionsArray, { transaction: t })

                        if (isProviderAbouts.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isProviderAbouts);
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
        .then(isProviderAbouts => {
            providerAbouts = isProviderAbouts;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(providerAbouts, err);
        })
    }

    // read(uuid_provider, callback) {
    //     let provider;
    //     let err;
        
    //     const providerPromise = new Promise((resolve, reject) => {
    //         try {
    //             sequelize.transaction(async (t) => {
    //                 try {
    //                     const isProvider = await this._Provider.findOne({
    //                         where: {
    //                             uuid_provider: uuid_provider    
    //                         },
    //                         attributes: {
    //                             exclude: ['createdAt', 'updatedAt']
    //                         }
    //                     }, { transaction: t })

    //                     resolve(isProvider);
    //                 } catch (error) {
    //                     reject(error);
    //                 }
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });

    //     providerPromise
    //     .then(isProvider => {
    //         provider = isProvider;
    //     }).catch(error => {
    //         err = error;
    //     }).finally(() => {
    //         callback(provider, err);
    //     })
    // }
}

const crudProviderAbout = new CRUDPROVIDERABOUT();

module.exports = { crudProviderAbout }