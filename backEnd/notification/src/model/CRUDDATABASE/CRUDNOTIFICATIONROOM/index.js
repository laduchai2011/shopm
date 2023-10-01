'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*room: string,
*type: integer,
*uuid_user: uuid
*} notificationRoomOptions
*/  

class NotificationRoom {
    constructor() {
        this._User = defineModel.getUser();
        this._NotificationRoom = defineModel.getNotificationRoom();
    }

    create(notificationRoomOptions, callback) {
        let notificationRoom;
        let err;
        
        const notificationRoomPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newNotificationRoom = await this._NotificationRoom.create(notificationRoomOptions, { transaction: t });
                        resolve(newNotificationRoom);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationRoomPromise
        .then(newNotificationRoom => {
            notificationRoom = newNotificationRoom;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(notificationRoom, err);
        })
    }

    readWithFK(uuid_user, type, callback) {
        let notificationRoom;
        let err;
        
        const notificationRoomPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isNotificationRoom = await this._NotificationRoom.findOne({
                            where: {
                                uuid_user: uuid_user,
                                type: type
                            },
                        }, { transaction: t });
                        resolve(isNotificationRoom);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationRoomPromise
        .then(isNotificationRoom => {
            notificationRoom = isNotificationRoom;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(notificationRoom, err);
        })
    }
}

const notificationRoom = new NotificationRoom();

module.exports = { notificationRoom }