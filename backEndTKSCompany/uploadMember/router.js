'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const { serviceRedis } = require('./src/model/serviceRedis');
const { serviceRedlock } = require('./src/config/serviceRedlock');
const { token } = require('./src/model/token');
const { Authentication } = require('./src/auth/Authentication');
// const { Authorization } = require('./src/auth/Authorization');
const { logEvents } = require('./logEvents');
// const { SvMessage } = require('./src/model/svMessage');

const { memberCRUD } = require('./src/model/CRUDDATABASE/CRUD_Member');

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

router.post('/login', (req, res) => {
    const loginOptions = req.body.loginOptions;
    memberCRUD.readToLogin(loginOptions, async (member, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (member === null) return res.status(200).json({
                member: member,
                success: false,
                message: 'Login failure. Account or password is incorrect !'
            });

            const loginCode = uuidv4();

            // create token
            const secretKey = uuidv4();
            let newRefreshToken, newAccessToken;
            
            const memberCp = member.dataValues;
            
            try {
                newRefreshToken = await token.createRefreshToken(secretKey, memberCp);
                newAccessToken = await token.createAccessTokens(secretKey, memberCp);
            } catch (error) {
                logEvents(`${req.url}---${req.method}---${error}`);
                return res.status(200).json({
                    message: 'Login failure !',
                    error: error,
                    success: false
                })
            }

            // cache refreshToken in redis
            const keyServiceRedis = `tokenTKS-${ memberCp.uuid_member }-${ loginCode }`;
            // console.log(keyServiceRedis)
            const jsonValue = { 
                secretKey: secretKey,
                refreshToken: newRefreshToken, 
                accessToken: newAccessToken,
                refreshToken_used: []
            };
            const timeExpireat = 60*60*24*30*12; // 1 year
            await serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);

            res.cookie('uuid_member', memberCp.uuid_member, {
                httpOnly: true,
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                // signed: true
            }).cookie('accessTokenTKS', newAccessToken, {
                httpOnly: true, 
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }).cookie('refreshTokenTKS', newRefreshToken, {
                httpOnly: true, 
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }).cookie('loginCodeTKS', loginCode, {
                httpOnly: true, 
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }).cookie('loginInforTKS', JSON.stringify(memberCp), {
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            })

            return res.status(200).json({
                member: memberCp,
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
                success: true,
                message: 'Login success !'
            });
        }
    })
})


module.exports = router;