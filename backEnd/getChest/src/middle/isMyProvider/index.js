'use strict';
require('dotenv').config();
const { logEvents } = require('../../../logEvents');
const { v4: uuidv4 } = require('uuid');
const { SvMessage } = require('../../model/svMessage');

const service = process.env.SERVICE;

async function getUuidProvider(uuid_provider, callback) {
    const svMessage = new SvMessage();
    await svMessage.init();
    const _id = uuidv4();
    
    function getAllUuidDepatment_(message) {
        const provider = JSON.parse(message).provider;
        const id = JSON.parse(message).id;
        const err = JSON.parse(message).err;
        if (_id === id) {
            callback(provider, err);
            svMessage.close();
        }
    }

    await svMessage.receiveMessage(`feedback__require__uuid_user__via__uuid_provider___${_id}`, { unsubscribe: true }, getAllUuidDepatment_);
    svMessage.sendMessage('require__uuid_user__via__uuid_provider', JSON.stringify({ id: _id, uuid_provider: uuid_provider }));
}

function isMyProvider(req, res, next) {
    const uuid_provider = req.query.uuid_provider;
    getUuidProvider(uuid_provider, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
        } else {
            if (provider) {
                const uuid = req.decodedToken.data.uuid;
                const uuid_user = provider.uuid_user;
                if (uuid===uuid_user) {
                    next();
                } else {
                    return res.status(200).json({
                        success: false,
                        message: `This provider is NOT your (${service}) !`
                    })
                }
            } else {
                return res.status(200).json({
                    success: false,
                    message: `This provider is NOT your (${service}) !`
                })
            }
        }
    })
}

module.exports = { isMyProvider }