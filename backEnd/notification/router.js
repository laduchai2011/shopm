'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');
const { token } = require('./src/model/token');
const { serviceRedis } = require('./src/model/serviceRedis');
const { getRoom } = require('./src/middle/getRoom');


router.get('/getRoom', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const roomType = req.query.roomType;
    getRoom(userOptions.uuid, roomType, (notificationRoom, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            console.log(err)
            return res.status(500).send({ 
                message: "Can't get room (notification_require_examine) !",
                err: err,
                success: false
            })
        } else {
            if (!notificationRoom) return res.status(200).send({ 
                message: "Can't get room (notification_require_examine) !",
                notificationRoom: notificationRoom,
                success: false
            })

            // create access-token for notificatio-socket
            const { loginCode, uid, loginInfor } = req.cookies;
            const keyServiceRedis = `socket-token-${ uid }-${ loginCode }`;
            const timeExpireat = 60*2; // 2p
            const secretKey = uuidv4();

            const accessToken_notificationSocket = token.createAccessTokens(secretKey, JSON.parse(loginInfor));

            const jsonValue = {
                secretKey: secretKey,
                accessToken: accessToken_notificationSocket
            }

            serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);

            return res.status(200).json({ 
                notificationRoom: notificationRoom,
                message: "Get room (notification_require_examine) successly !",
                success: true, 
                accessToken: accessToken_notificationSocket, 
                secretKey: secretKey

            })
        }
    })
});

module.exports = router;