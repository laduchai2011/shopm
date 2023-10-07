'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { notification } = require('./src/model/CRUDDATABASE/CRUDNOTIFICATION');


let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}


router.post('/createNotification', (req, res) => {
    const notificationOptions = req.body.notificationOptions;

    notification.create(notificationOptions, (notification, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Create notification NOT successly !",
                err: err,
                success: false
            })
        } else {
            if (notification!==null) {
                return res.status(200).json({ 
                    notification: notification,
                    message: "Create notification successly !",
                    success: true
                })
            } else {
                return res.status(200).json({ 
                    notification: notification,
                    message: "Create notification NOT successly !",
                    success: false
                })
            }
        }
    })
})

router.patch('/patchNotificationStatus', Authentication, (req, res) => {
    const type = req.body.type;
    const newStatus = req.body.newStatus;
    const currentStatus = req.body.currentStatus;
    const userOptions = req.decodedToken.data;
    const uuid_user = userOptions.uuid;

    notification.patchWithFk(uuid_user, type, newStatus, currentStatus, (notification, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Patch notification NOT successly !",
                err: err,
                success: false
            })
        } else {
            if (notification!==null) {
                return res.status(200).json({ 
                    notification: notification,
                    message: "Patch notification successly !",
                    success: true
                })
            } else {
                return res.status(200).json({ 
                    notification: notification,
                    message: "Patch notification NOT successly !",
                    success: false
                })
            }
        }
    })
})


module.exports = router;