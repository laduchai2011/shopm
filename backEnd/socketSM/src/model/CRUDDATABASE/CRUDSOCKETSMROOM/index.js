'use strict';
const { Op } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { defineModel } = require('../defineModel');

/**
*@typedef {
*room: string,
*status: integer,
*uuid_user: uuid
*} socketSMRoomOptions
*/  

class SocketSMRoom {
    constructor() {
        this._User = defineModel.getUser();
        this._SockerSMRoom = defineModel.getSockerSMRoom();
    }

    create(socketSMRoomOptions, callback) {
        let socketSMRoom;
        let err;
        
        const socketSMRoomPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const newSocketSMRoom = await this._SockerSMRoom.create(socketSMRoomOptions, { transaction: t });
                        resolve(newSocketSMRoom);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        socketSMRoomPromise
        .then(newSocketSMRoom => {
            socketSMRoom = newSocketSMRoom;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(socketSMRoom, err);
        })
    }

    readWithFK(uuid_user, type, callback) {
        let socketSMRoom;
        let err;
        
        const notificationRoomPromise = new Promise((resolve, reject) => {
            try {
                sequelize.transaction(async (t) => {
                    try {
                        const isSocketSMRoom = await this._SockerSMRoom.findOne({
                            where: {
                                uuid_user: uuid_user,
                                type: type
                            },
                        }, { transaction: t });
                        resolve(isSocketSMRoom);   
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });

        notificationRoomPromise
        .then(isSocketSMRoom => {
            socketSMRoom = isSocketSMRoom;
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(socketSMRoom, err);
        })
    }
}

const socketSMRoom = new SocketSMRoom();

module.exports = { socketSMRoom }