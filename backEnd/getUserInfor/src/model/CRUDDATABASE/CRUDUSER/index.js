const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*user: string, 
*password: string,
*phone: string,
*firstName: string,
*lastName: string,
*avatar: string
*} userOptions
*/ 

class CRUDUSER {
    constructor() {
        this._User = defineModel.getUser();
    }

    create(userOptions, callback) {
        let user;
        let err;
        
        const userPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isUser = await this._User.findAll({
                            where: {
                                [Op.or]: [
                                    { user: userOptions.user },
                                    { phone: userOptions.phone }
                                ]         
                            }
                        }, { transaction: t })

                        if (isUser.length === 0) {
                            const newUser = await this._User.create(userOptions, { transaction: t });
                            resolve(newUser);
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

        userPromise
        .then(newUser => {
            user = newUser
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(user, err);
        })
    }

    read(loginOptions, callback) {
        let user;
        let err;
        
        const userPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isUser = await this._User.findAll({
                            where: {
                                [Op.and]: [
                                    { user: loginOptions.user },
                                    { password: loginOptions.password }
                                ]         
                            },
                            attributes: {
                                exclude: ['phone', 'password', 'createdAt', 'updatedAt', 'avatar']
                            }
                        }, { transaction: t })

                        if (isUser.length === 0) {
                            resolve(null);
                        } else {
                            resolve(isUser[0]);
                        }   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        userPromise
        .then(newUser => {
            user = newUser
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(user, err);
        })
    }

    readWithPk_notification(uuid_user, callback) {
        let user;
        let err;

        const userPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isUser = await this._User.findByPk(
                            uuid_user, 
                            {
                                attributes: ['firstName', 'lastName', 'avatar']
                            },
                            { transaction: t }
                        )
                        resolve(isUser);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        })

        userPromise
        .then(isUser => {
            user = isUser;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(user, err);
        })
    }
}

const crudUser = new CRUDUSER();

module.exports = { crudUser }