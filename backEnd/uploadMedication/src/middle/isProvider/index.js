'use strict';
const { getProvider } = require('../getProvider');
const { logEvents } = require('../../../logEvents');

function isProvider(req, res, next) {
    const uuid_provider = req.body.uuid_provider;
    const uuid_user = req.decodedToken.data.uuid;

    console.log(1111111111111, uuid_provider)

    getProvider(uuid_provider, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get provider in isProvider !",
                err: err,
                success: false
            })
        } else {
            console.log(2222222222222, provider)
            if (provider?.uuid_user===uuid_user) {
                req.providerMid = provider;
                next();
            } else {
                return res.status(200).send({ 
                    message: "This provider is NOT your !",
                    success: false
                })
            }
        }
    })
}

module.exports = { isProvider }