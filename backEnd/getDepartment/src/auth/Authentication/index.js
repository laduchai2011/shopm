'use strict';
const { v4: uuidv4 } = require('uuid');
const { token } = require('../../model/token');
const { serviceRedis } = require('../../model/serviceRedis');
const { logEvents } = require('../../../logEvents');
const { serviceRedlock } = require('../../config/serviceRedlock');

async function Authentication(req, res, next) {
    const { refreshToken, accessToken, loginCode, uid } = req.cookies;
    const keyServiceRedis = `token-${ uid }-${ loginCode }`;
    const lockKey = `redlock-token-${ uid }-${ loginCode }`;

    try {
        // lock to update token
        const lock = await serviceRedlock.acquire([lockKey], 30000); 

        serviceRedis.getData(keyServiceRedis, async (redisData) => {
            if((redisData!==null) && (redisData)) {
                const secretKey = redisData.secretKey;
                const preSecretKey = redisData.preSecretKey;
                token.verify(accessToken, secretKey, async (err1, decodedAccessToken) => {
                    if(err1) {
                        logEvents(`${req.url}---${req.method}---${err1}: token.verify-accessToken`);
                        if ((redisData.refreshedToken === accessToken) && (redisData.refreshToken === refreshToken)) {
                            req.decodedToken = redisData.decodedToken;
                            await lock.release();
                            next();
                        } else if ((redisData.accessToken === accessToken) && (redisData.refreshToken === refreshToken)) {
                            token.verify(refreshToken, secretKey, async (err2, decodedRefreshToken) => {
                                if(err2) {
                                    logEvents(`${req.url}---${req.method}---${err2}: Token expired. Please login again !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Token expired. Please login again !',
                                        status: false,
                                        success: false
                                    })
                                }

                                const newSecretKey = uuidv4();
                                let newRefreshToken, newAccessToken;
                                try {
                                    newRefreshToken = await token.createRefreshToken(newSecretKey, decodedRefreshToken.data);
                                    newAccessToken = await token.createAccessTokens(newSecretKey, decodedRefreshToken.data);
                                } catch (error) {
                                    logEvents(`${req.url}---${req.method}---${error}: Please login 1 !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Please login 1 !',
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
                                    refreshToken_used: new_new_refreshToken_used,
                                    refreshedToken: accessToken,
                                    decodedToken: decodedRefreshToken
                                };
                                const timeExpireat = 60*60*24*30*12; // 1 year

                                try {
                                    await serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);
                                } catch (error) {
                                    logEvents(`${req.url}---${req.method}---${error}: Please login 2 !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Please login 2 !',
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
                                await lock.release();
                                next();
                            })
                        } else if ((redisData.preAccessToken === accessToken) && (redisData.preRefreshToken === refreshToken)) {
                            token.verify(refreshToken, preSecretKey, async (err2, decodedRefreshToken) => {
                                if(err2) {
                                    logEvents(`${req.url}---${req.method}---${err2}: Access token expired !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Access token expired !',
                                        status: false,
                                        success: false
                                    })
                                }

                                req.decodedToken = decodedRefreshToken;
                                await lock.release();
                                next();
                            })
                        } else {
                            if(redisData.refreshToken_used.includes(refreshToken)) {
                                logEvents(`${req.url}---${req.method}: Your account is attacked. Please login again !`);
                                await lock.release();
                                return res.status(200).json({
                                    message: 'Your account is attacked. Please login again !',
                                    status: false,
                                    success: false
                                })
                            } else {
                                logEvents(`${req.url}---${req.method}: Invalid token. Please login !`);
                                await lock.release();
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
                        await lock.release();
                        next();
                    }
                })
            } else {
                logEvents(`${req.url}---${req.method}: Please login 3 !`);
                await lock.release();
                return res.status(200).json({
                    message: 'Please login 3 !',
                    status: false,
                    success: false
                })
            }
        })
    } catch (error) {
        logEvents(`${req.url}---${req.method}: Please login 4 !`);
        return res.status(200).json({
            message: 'Please login 4 !',
            status: false, 
            error: error,
            success: false
        })
    }
}

async function AuthenticationTKS(req, res, next) {
    const { refreshTokenTKS, accessTokenTKS, loginCodeTKS, uuid_member } = req.cookies;
    const keyServiceRedis = `tokenTKS-${ uuid_member }-${ loginCodeTKS }`;
    const lockKey = `redlock-tokenTKS-${ uuid_member }-${ loginCodeTKS }`;

    try {
        // lock to update token
        const lock = await serviceRedlock.acquire([lockKey], 30000); 

        serviceRedis.getData(keyServiceRedis, async (redisData) => {
            if((redisData!==null) && (redisData)) {
                const secretKey = redisData.secretKey;
                const preSecretKey = redisData.preSecretKey;
                token.verify(accessTokenTKS, secretKey, async (err1, decodedAccessToken) => {
                    if(err1) {
                        logEvents(`${req.url}---${req.method}---${err1}: token.verify-accessTokentks`);
                        if ((redisData.refreshedToken === accessTokenTKS) && (redisData.refreshToken === refreshTokenTKS)) {
                            req.decodedToken = redisData.decodedToken;
                            await lock.release();
                            next();
                        } else if ((redisData.accessToken === accessTokenTKS) && (redisData.refreshToken === refreshTokenTKS)) {
                            token.verify(refreshTokenTKS, secretKey, async (err2, decodedRefreshToken) => {
                                if(err2) {
                                    logEvents(`${req.url}---${req.method}---${err2}: Token expired. Please login again !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Token expired. Please login again !',
                                        status: false,
                                        success: false
                                    })
                                }

                                const newSecretKey = uuidv4();
                                let newRefreshToken, newAccessToken;
                                try {
                                    newRefreshToken = await token.createRefreshToken(newSecretKey, decodedRefreshToken.data);
                                    newAccessToken = await token.createAccessTokens(newSecretKey, decodedRefreshToken.data);
                                } catch (error) {
                                    logEvents(`${req.url}---${req.method}---${error}: Please login !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Please login 1 !',
                                        status: false,
                                        error: error,
                                        success: false
                                    })
                                }

                                // cache refreshToken in redis
                                let new_new_refreshToken_used = [...redisData.refreshToken_used];
                                if (new_new_refreshToken_used.length < 50) {
                                    new_new_refreshToken_used.push(refreshTokenTKS);
                                } else {
                                    new_new_refreshToken_used = [];
                                }
                                const jsonValue = { 
                                    secretKey: newSecretKey,
                                    refreshToken: newRefreshToken, 
                                    accessToken: newAccessToken,
                                    preSecretKey: secretKey,
                                    preRefreshToken: refreshTokenTKS,
                                    preAccessToken: accessTokenTKS, 
                                    refreshToken_used: new_new_refreshToken_used,
                                    refreshedToken: accessTokenTKS,
                                    decodedToken: decodedRefreshToken
                                };
                                const timeExpireat = 60*60*24*30*12; // 1 year

                                try {
                                    await serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);
                                } catch (error) {
                                    logEvents(`${req.url}---${req.method}---${error}: Please login !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Please login 2 !',
                                        status: false,
                                        error: error,
                                        success: false
                                    })
                                }

                                let secure_cookie = false;
                                if (process.env.NODE_ENV !== 'development') {
                                    secure_cookie = true;
                                }

                                res.cookie('uuid_member', uuid_member, {
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
                                })

                                // return res.status(201).json({
                                //     message: 'Reset token !', 
                                //     status: true
                                // })

                                req.decodedToken = decodedRefreshToken;
                                await lock.release();
                                next();
                            })
                        } else if ((redisData.preAccessToken === accessTokenTKS) && (redisData.preRefreshToken === refreshTokenTKS)) {
                            token.verify(refreshTokenTKS, preSecretKey, async (err2, decodedRefreshToken) => {
                                if(err2) {
                                    logEvents(`${req.url}---${req.method}---${err2}: Access token expired !`);
                                    await lock.release();
                                    return res.status(200).json({
                                        message: 'Access token expired !',
                                        status: false,
                                        success: false
                                    })
                                }

                                req.decodedToken = decodedRefreshToken;
                                await lock.release();
                                next();
                            })
                        } else {
                            if(redisData.refreshToken_used.includes(refreshTokenTKS) !== -1) {
                                logEvents(`${req.url}---${req.method}: Your account is attacked. Please login again !`);
                                await lock.release();
                                return res.status(200).json({
                                    message: 'Your account is attacked. Please login again !',
                                    status: false,
                                    success: false
                                })
                            } else {
                                logEvents(`${req.url}---${req.method}: Invalid token. Please login !`);
                                await lock.release();
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
                        await lock.release();
                        next();
                    }
                })
            } else {
                logEvents(`${req.url}---${req.method}: Please login !`);
                await lock.release();
                return res.status(200).json({
                    message: 'Please login 3 !',
                    status: false,
                    success: false
                })
            }
        })
    } catch (error) {
        logEvents(`${req.url}---${req.method}: Please login !`);
        return res.status(200).json({
            message: 'Please login 4 !',
            status: false, 
            error: error,
            success: false
        })
    }
}

module.exports = { 
    Authentication,
    AuthenticationTKS 
}