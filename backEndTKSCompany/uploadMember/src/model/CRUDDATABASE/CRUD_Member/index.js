'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

    

class Member {
    constructor() {
        this._Member = defineModel.getMember();
    }

    readToLogin(loginOptions, callback) {
        let member;
        let err;
        
        const memberPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isMember = await this._Member.findOne({
                            where: { 
                                account: loginOptions.account, 
                                password: loginOptions.password 
                            },
                            attributes: {
                                exclude: ['phone', 'password', 'createdAt', 'updatedAt', 'note', 'status']
                            }
                        }, { transaction: t })
                        resolve(isMember);  
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        memberPromise
        .then(isMember => {
            member = isMember
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(member, err);
        })
    }

}

const memberCRUD = new Member();

module.exports = { memberCRUD }