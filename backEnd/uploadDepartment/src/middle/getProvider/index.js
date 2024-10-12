'use strict';
const { SvMessage } = require('../../model/svMessage');
const { v4: uuidv4 } = require('uuid');

async function getProvider(uuid_provider, callback) {
    const _id = uuidv4();
    const svMessage = new SvMessage();

    function getProviderkFc(message) {
        const id = JSON.parse(message).id;
        const provider = JSON.parse(message).provider;
        const err = JSON.parse(message).err;
        
        if (_id === id) {
            callback(provider, err);
        }

        svMessage.close();
    }

    await svMessage.init();

    await svMessage.receiveMessage(`feedback_require__provider__via__uuid_provider___${_id}`, { unsubscribe: true }, getProviderkFc);
    svMessage.sendMessage('require__provider__via__uuid_provider', JSON.stringify({ id: _id, uuid_provider: uuid_provider }));
}

function getProviderMid(req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        console.log('\x1b[33m%s\x1b[0m', 'getProviderMid', 'getProviderMid');
    }
    
    const uuid_provider = req.body.uuid_provider;
    getProvider(uuid_provider, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: `Can't get provider in isProvider !`,
                err: err,
                success: false
            })
        } else {
            if (provider && provider!==null) {
                req.providerMid = provider;
                next();
            } else {
                return res.status(200).json({
                    success: false,
                    message: `This provider is NOT empty !`,
                })
            }
        }
    })
}

module.exports = { getProvider, getProviderMid }