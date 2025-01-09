'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication_SHOPM } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
const { notification } = require('./src/model/CRUDDATABASE/CRUDNOTIFICATION');


let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

router.get('/getNotificationCount', 
    Authentication_SHOPM, 
    (req, res) => {
    const type = req.query.type;
    const status = req.query.status;
    const userOptions = req.decodedToken.data;
    const uuid_user = userOptions.uuid;
    notification.readCountWithFk(uuid_user, type, status, (count, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record list !",
                err: err,
                success: false
            })
        } else {
            return res.status(200).json({ 
                count: count,
                message: "Get get notification count successly !",
                success: true
            })
            
        }
    })
})

router.get('/getNotificationList', 
    Authentication_SHOPM, 
    (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    const type = req.query.type;
    const status = req.query.status;
    const statusArray = status === 'all' ? ['sent', 'receved', 'seen', 'read'] : [status];
    const userOptions = req.decodedToken.data;
    const uuid_user = userOptions.uuid;
    notification.bulkReadWithFk(uuid_user, type, statusArray, Number(pageIndex), Number(pageSize), (notifications, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get case-record list !",
                err: err,
                success: false
            })
        } else {
            if (notifications && (notifications!==null)) {
                return res.status(200).json({ 
                    notifications: notifications,
                    message: "Get get notification successly !",
                    success: true
                })
            } else {
                return res.status(200).json({ 
                    notifications: notifications,
                    message: "Get get notification NOT successly !",
                    success: false
                })
            }
            
        }
    })
})


module.exports = router;