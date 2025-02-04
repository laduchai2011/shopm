const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*name: string, 
*birthday: date,
*sex: boolean,
*address: string,
*phone: string,
*uuid_user: uuid
*} sickpersonOptions
*/ 

class SICKPERSON {
    constructor() {
        this._SickPerson = defineModel.getSickPerson();
    }

    create(sickpersonOptions, callback) {
        let sickPerson;
        let err;
        
        const sickpersonPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isSickPerson = await this._SickPerson.findAll({
                            where: {
                                [Op.or]: [
                                    { uuid_user: sickpersonOptions.uuid_user }
                                ]         
                            }
                        }, { transaction: t })

                        if (isSickPerson.length === 0) {
                            const newSickPerson = await this._SickPerson.create(sickpersonOptions, { transaction: t });
                            resolve(newSickPerson);
                        } else {
                            resolve(null);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        sickpersonPromise
        .then(newSickPerson => {
            sickPerson = newSickPerson;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(sickPerson, err);
        })
    }
}

const sickPerson = new SICKPERSON();

module.exports = { sickPerson }