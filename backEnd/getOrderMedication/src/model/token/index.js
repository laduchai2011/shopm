'use strict';
const jwt = require('jsonwebtoken');

class Token {
    constructor() {}

    async createToken(expiresIn, key, data) {
        const tokenPromise = new Promise((resolve, reject) => {
            jwt.sign({
                data: data
            }, key, { expiresIn: expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        })

        return tokenPromise;
    }

    async createAccessTokens(key, data) {
        const expiresIn = 60 * 1;
        const accessToken = await this.createToken(expiresIn, key, data);
        // const accessToken = await jwt.sign({
        //     data: data
        // }, key, { expiresIn: 60 * 1 }, (err, encoded) => {

        // });
        return accessToken;
    }

    async createRefreshToken(key, data) {
        const expiresIn = 60 * 60 * 24 * 30 * 12;
        const refreshToken = await this.createToken(expiresIn, key, data);
        // const refreshToken = await jwt.sign({
        //     data: data
        // }, key, { expiresIn: 60 * 60 * 24 * 30 * 12 });
        return refreshToken;
    }

    verify(token, key, callback) {
        jwt.verify(token, key, function(err, decoded) {
            callback(err, decoded)
        });
    }
}

const token = new Token();

module.exports = { token }