const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*type: string,
*information: text,
*cost: int,
*status: string,
*uuid_orderMedication: uuid
*} transportOptions
*/ 

class TRANSPORT {
    constructor() {
        this._Transport = defineModel.getTransport();
    }

    readWithFk(uuid_orderMedication, callback) {
        let transport;
        let err;
        
        const transportPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newTransport = await this._Transport.findOne(
                            {
                                where: {
                                    uuid_orderMedication: uuid_orderMedication,
                                    [Op.or]: [
                                        {[Op.not]: { status: 'delete' }}
                                    ]
                                }
                            },
                            { transaction: t }
                        );
                        resolve(newTransport);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        transportPromise
        .then(newTransport => {
            transport = newTransport;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(transport, err);
        })
    }
}

const transportCRUD = new TRANSPORT();

module.exports = { transportCRUD }