'use strict';
require('dotenv').config();
const { getProvider } = require('../getProvider');
const { logEvents } = require('../../../logEvents');

const service = process.env.SERVICE;

function isMyProvider(req, res, next) {
    const uuid_provider = req.query.uuid_provider;
    const uuid_user = req.decodedToken.data.uuid;

    getProvider(uuid_provider, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: `Can't get provider in isProvider (${service}) !`,
                err: err,
                success: false
            })
        } else {
            if (provider?.uuid_user===uuid_user) {
                req.providerMid = provider;
                next();
            } else {
                return res.status(200).send({ 
                    message: `This provider is NOT your (${service}) !`,
                    success: false
                })
            }
        }
    })
}

module.exports = { isMyProvider }