'use strict';
const { v4: uuidv4 } = require('uuid');

const { notificationRoom: notificationRoom_obj } = require('../../model/CRUDDATABASE/CRUDNOTIFICATIONROOM');



/**
*@typedef {
*room: string,
*type: integer,
*uuid_user: uuid
*} notificationRoomOptions
*/


const getRoom = (uuid_user, type, callback) => {
    let notificationRoom;
    let err;

    const getRoomPromise = new Promise((resolve, reject) => {
        notificationRoom_obj.readWithFK(uuid_user, type, (notificationRoom1, err) => {
            if (err) { reject(err) } else {
                if (notificationRoom1) {
                    resolve(notificationRoom1);
                } else {
                    if (!notificationRoom1 || (notificationRoom1===null)) {
                        const notificationRoomOptions = {
                            room: uuidv4(),
                            type: type,
                            uuid_user: uuid_user
                        };
                        notificationRoom_obj.create(notificationRoomOptions, (notificationRoom2, err) => {
                            if (err) { reject(err) } else {
                                resolve(notificationRoom2);
                            }
                        })
                    }
                }
            }  
        })
    });
    
    getRoomPromise
    .then(notificationRoom3 => {
        notificationRoom = notificationRoom3;
    }).catch(error => {
        err = error;
    }).finally(() => {
        callback(notificationRoom, err);
    })
}

module.exports = { getRoom };