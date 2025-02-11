'use strict';
const { clientRedisFc } = require('../../config/serviceRedis');
// const { logEvents } = require('../../../logEvents');

class Subscriber {
    constructor() {
        this._client = new clientRedisFc();
        // this._client.on('error', err => logEvents(`Redis Client Error ${err} (publisher)`));
        this._client.on('error', err => console.error(err));
    }

    async init() {
        this.subscriber = this._client.duplicate();
        await this.subscriber.connect();
        return this.subscriber;
    }
}

module.exports = { Subscriber };