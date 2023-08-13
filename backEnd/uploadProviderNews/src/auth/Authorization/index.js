'use strict';
const { v4: uuidv4 } = require('uuid');
const { token } = require('../../model/token');
const { serviceRedis } = require('../../model/serviceRedis');

function Authorization(req, res, next) {
    const { refreshToken, accessToken, loginCode, uid } = req.cookies;
    const uidProvider = req.params.id;
    const keyServiceRedis = `token-${ uid }-${ loginCode }`;
    req.providerRole = 'normal';
    try {
        serviceRedis.getData(keyServiceRedis, (redisData) => {
            if(redisData !== null) {
                const secretKey = redisData.secretKey;
                token.verify(accessToken, secretKey, (err1, decodedAccessToken) => {
                    if(err1) {
                        if ((redisData.accessToken === accessToken) && (redisData.refreshToken === refreshToken)) {
                            token.verify(refreshToken, secretKey, (err2, decodedRefreshToken) => {
                                if(err2) {
                                    console.error(err2)
                                } else {
                                    if (uidProvider === decodedRefreshToken.data.uuid) {
                                        req.providerRole = 'admin';
                                    }
                                    
                                    const newSecretKey = uuidv4();
                                    const newRefreshToken = token.createRefreshToken(newSecretKey, decodedRefreshToken.data);
                                    const newAccessToken = token.createAccessTokens(newSecretKey, decodedRefreshToken.data);

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
                                        preRefreshToken: refreshToken,
                                        preAccessToken: accessToken, 
                                        refreshToken_used: new_new_refreshToken_used
                                    };
                                    const timeExpireat = 60*60*24*30*12; // 1 year
                                    try {
                                        serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);
                                    } catch (error) {
                                        console.error(error)
                                    }
                                    
                                    res.cookie('uid', uid, {
                                        httpOnly: true,
                                        secure: true,
                                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                                        // signed: true
                                    }).cookie('accessToken', newAccessToken, {
                                        httpOnly: true, 
                                        secure: true,
                                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                                    }).cookie('refreshToken', newRefreshToken, {
                                        httpOnly: true, 
                                        secure: true,
                                        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                                    })

                                    req.decodedToken = decodedRefreshToken;
                                }
                            })
                        } else {
                            if(redisData.refreshToken_used.includes(refreshToken)) {
                                return res.status(200).json({
                                    message: 'Your account is attacked. Please login again !',
                                    status: false,
                                    hacked: true
                                })
                            } 
                        }
                    } else {
                        // return res.status(200).json({
                        //     message: 'Running !',
                        //     status: true
                        // })
                        req.providerRole = 'admin';
                        req.decodedToken = decodedAccessToken;
                    }
                })
            }
        })
    } catch (error) {
        console.error(error);
        next();
    }
}

module.exports = { Authorization }

// else if ((redisData.preAccessToken === accessToken) && (redisData.preRefreshToken === refreshToken)) {
//     req.providerRole = 'admin';
// }