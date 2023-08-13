const { Sequelize, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../../config/database');

/**
*@typedef {
*user: string, 
*password: string,
*phone: string,
*firstName: string,
*lastName: string
*} userOptions
*/ 

class CRUDUSER {
    constructor() {
        this._User = sequelize.define('User', {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: 'UQ__Users__id'
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false, 
                unique: 'UQ__Users__user'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'UQ__Users__phone'
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            // Other model options go here
        });
        sequelize.sync();
    }

    async getUser() {
        let user;
        let err;

        const userPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isUser = await this._User.findAll({
                            where: {
                                [Op.and]: [
                                    { user: userOptions.user },
                                    { password: userOptions.password }
                                ]         
                            }
                        }, { transaction: t });

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
        })

        userPromise
        .then(newUser => {
            user = newUser
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(user, err);
        })
    }
}

const curdUser = new CRUDUSER();

module.exports = { curdUser }