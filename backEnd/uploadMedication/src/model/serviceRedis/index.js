'use strict';
const { clientRedis } = require('../../config/serviceRedis');
const { logEvents } = require('../../../logEvents');

class ServiceRedis {
    constructor(clientRedis) {
        this._clientRedis = clientRedis;
        this._clientRedis.on('error', err => logEvents(`Redis Client Error ${err}`));
        this._clientRedis.connect();
    }

    async setData(key, jsonValue, timeExpireat) {
        if (key) {
            // timeExpireat: { EX: 60*60*24 }
            const valueToString = JSON.stringify(jsonValue);
            const isSet = await this._clientRedis.set(key, valueToString, { EX: timeExpireat });
            if (isSet==='OK') {
                return true;
            }
            return false;
        } else {
            throw new Error('Invalid key type!');
        }
    }

    getData(key, callback) {
        if (key) {
            this._clientRedis.get(key).then(data => {
                const valueToJson = JSON.parse(data);
                callback(valueToJson);
            })
        } else {
            throw new Error('Invalid key type!');
        }
    }

    async deleteData(key) {      
        if (key) {
            const reply = await this._clientRedis.del(key);
            if (reply === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error('Invalid key type!');
        }
    }
}

const serviceRedis = new ServiceRedis(clientRedis);

module.exports = { serviceRedis }