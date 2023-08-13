const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*news: text, 
*like: integer,
*comment: integer,
*share: integer,
*status: string,
*uuid_provider: uuid
*} providerNewsOptions
*/ 

class CRUDPROVIDERNEWS {
    constructor() {
        this._ProviderNews = defineModel.getProviderNews();
    }

    bulkReadFilter_provider(uuid_provider, pageIndex, pageSize, callback) {
        let providerNews;
        let err;
        
        const providerNewsPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isProviderNews = await this._ProviderNews.findAndCountAll({
                            where: {
                                uuid_provider: uuid_provider    
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t })

                        if (isProviderNews.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isProviderNews);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        providerNewsPromise
        .then(isProviderNews => {
            providerNews = isProviderNews;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(providerNews, err);
        })
    }
}

const crudProviderNews = new CRUDPROVIDERNEWS();

module.exports = { crudProviderNews }