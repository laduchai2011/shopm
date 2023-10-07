'use strict';
const { token } = require('../../model/token');
const { serviceRedis } = require('../../model/serviceRedis');
const { logEvents } = require('../../../logEvents');

function SocketSM_Authentication (socket, next) {
    const { loginCode, uid } = socket.request.cookies;
    const keyServiceRedis = `socket-token-${ uid }-${ loginCode }`;
    const secretKey = socket.handshake.auth.secretKey;
    const accessToken = socket.handshake.auth.accessToken;
    try {
        serviceRedis.getData(keyServiceRedis, (redisData) => {
            if ((redisData!==null) && (redisData.secretKey===secretKey) && (redisData.accessToken===accessToken)) {
                token.verify(accessToken, secretKey, (err, decodedAccessToken) => {
                    if (err) {
                        logEvents(`( SocketSM_Authentication ) ${err}`);
                        const err = new Error("Err socket-accessToken ( SocketSM_Authentication ) !");
                        err.err = err; // additional details
                        next(err);
                    } else {
                        socket.handshake.decodedAccessToken = decodedAccessToken;
                        next();
                    }
                })
            } else {
                const err = new Error("Socket-accessToken invalid or not created ( SocketSM_Authentication ) !");
                logEvents(`( SocketSM_Authentication ) ${err}`);
                next(err);
            }
        })
    } catch (error) {
        const err = new Error("Err try-catch ( SocketSM_Authentication ) !");
        err.err = err; // additional details
        logEvents(`( SocketSM_Authentication ) ${err}`);
        next(err);
    }
}

module.exports = { SocketSM_Authentication }