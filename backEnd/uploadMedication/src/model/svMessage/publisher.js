'use strict';
const { clientRedisFc } = require('../../config/serviceRedis');
// const { logEvents } = require('../../../logEvents');

class Publisher {
    constructor() {
        this._client = new clientRedisFc();
        // this._client.on('error', err => logEvents(`Redis Client Error ${err} (publisher)`));
        this._client.on('error', err => console.error(err));
    }

    async init() {
        const publisher = this._client;
        await publisher.connect();
        return publisher;
    }
}

module.exports = { Publisher };