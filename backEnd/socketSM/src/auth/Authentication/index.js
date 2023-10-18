'use strict';
const { v4: uuidv4 } = require('uuid');
const { token } = require('../../model/token');
const { serviceRedis } = require('../../model/serviceRedis');
const { logEvents } = require('../../../logEvents');

function Authentication(req, res, next) {
    const { refreshToken, accessToken, loginCode, uid } = req.cookies;
    const keyServiceRedis = `token-${ uid }-${ loginCode }`;
    try {
        serviceRedis.getData(keyServiceRedis, (redisData) => {
            if((redisData!==null) && (redisData)) {
                const secretKey = redisData.secretKey;
                const preSecretKey = redisData.preSecretKey;
                token.verify(accessToken, secretKey, (err1, decodedAccessToken) => {
                    if(err1) {
                        logEvents(`${req.url}---${req.method}---${err1}: token.verify-accessToken`);
                        if ((redisData.accessToken === accessToken) && (redisData.refreshToken === refreshToken)) {
                            token.verify(refreshToken, secretKey, async (err2, decodedRefreshToken) => {
                                logEvents(`${req.url}---${req.method}---${err2}: Token expired. Please login again !`);
                                if(err2) return res.status(200).json({
                                    message: 'Token expired. Please login again !',
                                    status: false,
                                    success: false
                                })

                                const newSecretKey = uuidv4();
                                let newRefreshToken, newAccessToken;
                                try {
                                    newRefreshToken = await token.createRefreshToken(newSecretKey, decodedRefreshToken.data);
                                    newAccessToken = await token.createAccessTokens(newSecretKey, decodedRefreshToken.data);
                                } catch (error) {
                                    logEvents(`${req.url}---${req.method}---${error}: Please login !`);
                                    return res.status(200).json({
                                        message: 'Please login !',
                                        status: false,
                                        error: error,
                                        success: false
                                    })
                                }

                                // cache refreshToken in redis
                                let new_new_refreshToken_used = [...redisData.refreshToken_used];
                                if (new_new_refreshToken_used.length < 50) {
                                    new_new_refreshToken_used.push(refreshToken);
                                } else {
                                    new_new_refreshToken_used = [];
                                }
                                const jsonValue = { 
                                    secretKey: newSecretKey,
                                    refreshToken: newRefreshToken, 
                                    accessToken: newAccessToken,
                                    preSecretKey: secretKey,
                                    preRefreshToken: refreshToken,
                                    preAccessToken: accessToken, 
                                    refreshToken_used: new_new_refreshToken_used
                                };
                                const timeExpireat = 60*60*24*30*12; // 1 year

                                try {
                                    await serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);
                                } catch (error) {
                                    logEvents(`${req.url}---${req.method}---${error}: Please login !`);
                                    return res.status(200).json({
                                        message: 'Please login !',
                                        status: false,
                                        error: error,
                                        success: false
                                    })
                                }

                                let secure_cookie = false;
                                if (process.env.NODE_ENV !== 'development') {
                                    secure_cookie = true;
                                }

                                res.cookie('uid', uid, {
                                    httpOnly: true,
                                    secure: secure_cookie,
                                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                                    // signed: true
                                }).cookie('accessToken', newAccessToken, {
                                    httpOnly: true, 
                                    secure: secure_cookie,
                                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                                }).cookie('refreshToken', newRefreshToken, {
                                    httpOnly: true, 
                                    secure: secure_cookie,
                                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                                })

                                // return res.status(201).json({
                                //     message: 'Reset token !', 
                                //     status: true
                                // })
                                req.decodedToken = decodedRefreshToken;
                                next();
                            })
                        } else if ((redisData.preAccessToken === accessToken) && (redisData.preRefreshToken === refreshToken)) {
                            token.verify(refreshToken, preSecretKey, (err2, decodedRefreshToken) => {
                                if(err2) {
                                    logEvents(`${req.url}---${req.method}---${err2}: Access token expired !`);
                                    return res.status(200).json({
                                        message: 'Access token expired !',
                                        status: false,
                                        success: false
                                    })
                                }

                                req.decodedToken = decodedRefreshToken;
                                next();
                            })
                        } else {
                            if(redisData.refreshToken_used.includes(refreshToken)) {
                                return res.status(200).json({
                                    message: 'Your account is attacked. Please login again !',
                                    status: false,
                                    success: false
                                })
                            } else {
                                return res.status(200).json({
                                    message: 'Invalid token. Please login !',
                                    status: false,
                                    success: false
                                })
                            }
                        }
                    } else {
                        // return res.status(200).json({
                        //     message: 'Running !',
                        //     status: true
                        // })
                        req.decodedToken = decodedAccessToken;
                        next();
                    }
                })
            } else {
                return res.status(200).json({
                    message: 'Please login !',
                    status: false,
                    success: false
                })
            }
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Please login !',
            status: false, 
            error: error,
            success: false
        })
    }
}

module.exports = { Authentication }