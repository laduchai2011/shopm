const jwt = require('jsonwebtoken');

class Token {
    constructor() {}

    async createAccessTokens(key, data) {
        const token = await jwt.sign({
            data: data
        }, key, { expiresIn: 60 * 1 });
        return token;
    }

    createRefreshToken(key, data) {
        return jwt.sign({
            data: data
        }, key, { expiresIn: 60 * 60 * 24 * 30 * 12 });
    }

    verify(token, key, callback) {
        jwt.verify(token, key, function(err, decoded) {
            callback(err, decoded)
        });
    }
}

const token = new Token();

module.exports = { token }