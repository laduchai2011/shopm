'use strict';
const { v4: uuidv4 } = require('uuid');

const { socketSMRoom: socketSMRoom_obj } = require('../../model/CRUDDATABASE/CRUDSOCKETSMROOM');



/**
*@typedef {
*room: string,           // notification-chat2
*type: string,
*status: string,
*uuid_user: uuid
*} socketSMRoomOptions
*/


const getSocketSMRoom = (uuid_user, type, status, callback) => {
    let socketSMRoom;
    let err;

    const getSocketSMRoomPromise = new Promise((resolve, reject) => {
        socketSMRoom_obj.readWithFK(uuid_user, status, (socketSMRoom1, err) => {
            if (err) { reject(err) } else {
                if (socketSMRoom1!==null) {
                    resolve(socketSMRoom1);
                } else {
                    if (!socketSMRoom1 || (socketSMRoom1===null)) {
                        const notificationRoomOptions = {
                            room: uuidv4(),
                            type: type,
                            status: 'normal',
                            uuid_user: uuid_user
                        };
                        socketSMRoom_obj.create(notificationRoomOptions, (socketSMRoom2, err) => {
                            if (err) { reject(err) } else {
                                resolve(socketSMRoom2);
                            }
                        })
                    }
                }
            }  
        })
    });
    
    getSocketSMRoomPromise
    .then(socketSMRoom3 => {
        socketSMRoom = socketSMRoom3;
    }).catch(error => {
        err = error;
    }).finally(() => {
        callback(socketSMRoom, err);
    })
}

module.exports = { getSocketSMRoom };