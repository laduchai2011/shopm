'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*type: string,
*notification: text,
*status: string,  // sent - receved - seen - read - deleted / 1 - 2 - 3 - 4 - 5
*uuid_user: uuid
*} notificationOptions
*/  

/**
*@typedef {
*title: string, 
*type: string,
*uuid_userSent: string,
*data: json
*} notification
*/

class Notification {
    constructor() {
        this._Notification = defineModel.getNotification();
    }

    readCountWithFk(uuid_user, type, status, callback) {
        let count;
        let err;
        
        const notificationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isNotifications_count = await this._Notification.count({
                            where: {
                                [Op.and]: [
                                    { uuid_user: uuid_user },
                                    { type: type },
                                    { status: status }
                                ]
                            }
                        }, { transaction: t });
                        resolve(isNotifications_count);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationPromise
        .then(isNotifications_count => {
            count = isNotifications_count;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(count, err);
        })
    }

    bulkReadWithFk(uuid_user, type, statusArray, pageIndex, pageSize, callback) {
        let notifications;
        let err;
        
        const notificationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isNotifications = await this._Notification.findAndCountAll({
                            where: {
                                [Op.and]: [
                                    { uuid_user: uuid_user },
                                    { type: type },
                                    { status: { [Op.in]: statusArray } }
                                ]
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            offset: pageSize * (pageIndex - 1),
                            limit: pageSize
                        }, { transaction: t });
                        resolve(isNotifications);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationPromise
        .then(isNotifications => {
            notifications = isNotifications;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(notifications, err);
        })
    }
}

const notification = new Notification();

module.exports = { notification }