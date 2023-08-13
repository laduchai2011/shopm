const jwt = require('jsonwebtoken');

class Token {
    constructor() {}

    createAccessTokens(key, data) {
        return jwt.sign({
            data: data
        }, key, { expiresIn: 60 * 5 });
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