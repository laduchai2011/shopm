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

class Notification {
    constructor() {
        this._Notification = defineModel.getNotification();
    }

    create(notificationOptions, callback) {
        let notification;
        let err;
        
        const notificationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isNotification = await this._Notification.create(notificationOptions, { transaction: t });
                        resolve(isNotification);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationPromise
        .then(isNotification => {
            notification = isNotification;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(notification, err);
        })
    }

    patchWithFk(uuid_user, type, newStatus, currentStatus, callback) {
        let notification;
        let err;
        
        const notificationPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isNotification = await this._Notification.update({
                            status: newStatus
                        }, {
                            where: {
                                uuid_user: uuid_user,
                                type: type,
                                status: currentStatus
                            }
                        }, { transaction: t });
                        resolve(isNotification);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationPromise
        .then(isNotification => {
            notification = isNotification;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(notification, err);
        })
    }
}

const notification = new Notification();

module.exports = { notification }