'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');
const { token } = require('./src/model/token');
const { serviceRedis } = require('./src/model/serviceRedis');
const { getSocketSMRoom } = require('./src/middle/getSocketSMRoom');


router.get('/getRoom', Authentication, (req, res) => {
    const userOptions = req.decodedToken.data;
    const type = req.query.type;
    const status = req.query.status;
    getSocketSMRoom(userOptions.uuid, type, status, async (socketSMRoom, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get socketSM room !",
                err: err,
                success: false
            })
        } else {
            if (!socketSMRoom) return res.status(200).send({ 
                message: "Can't get socketSM room !",
                socketSMRoom: socketSMRoom,
                success: false
            })

            // create access-token for notificatio-socket
            const { loginCode, uid, loginInfor } = req.cookies;
            const keyServiceRedis = `socket-token-${ uid }-${ loginCode }`;
            const timeExpireat = 60 * 2; // 2p
            const secretKey = uuidv4();

            let accessToken_socketSMRoom;

            try {
                accessToken_socketSMRoom = await token.createAccessTokens(secretKey, JSON.parse(loginInfor));
            } catch (error) {
                logEvents(`${req.url}---${req.method}---${error}`);
                return res.status(200).json({
                    message: 'Get room failure !',
                    error: error,
                    success: false
                })
            }

            const jsonValue = {
                secretKey: secretKey,
                accessToken: accessToken_socketSMRoom
            }

            try {
                await serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);
            } catch (error) {
                logEvents(`${req.url}---${req.method}---${err2}`);
                return res.status(200).json({
                    message: 'Please login !',
                    error: error,
                    success: false
                })
            }

            return res.status(200).json({ 
                socketSMRoom: socketSMRoom,
                message: "Get socketSM room successly !",
                success: true, 
                accessToken: accessToken_socketSMRoom, 
                secretKey: secretKey

            })
        }
    })
});

module.exports = router;