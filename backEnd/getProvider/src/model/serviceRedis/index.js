const { clientRedis } = require('../../config/serviceRedis');

class ServiceRedis {
    constructor(clientRedis) {
        this._clientRedis = clientRedis;
        this._clientRedis.connect();
    }

    async setData(key, jsonValue, timeExpireat) {
        if (key) {
           // timeExpireat: { EX: 60*60*24 }
            const valueToString = JSON.stringify(jsonValue);
            await this._clientRedis.set(key, valueToString, { EX: timeExpireat });
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
}

const serviceRedis = new ServiceRedis(clientRedis);

module.exports = { serviceRedis }