'use strict';
const { providerCRUD } = require('../../model/CRUDDATABASE/CRUD_Provider');
const { logEvents } = require('../../../logEvents');

function getProviderMid (req, res, next) {
    const uuid_provider = req.body.uuid_provider;

    providerCRUD.read(uuid_provider, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't getProviderMid !",
                err: err,
                success: false
            })
        } else {
            if (provider && provider!==null) {
                req.providerMid = provider;
                next();
            } else {
                return res.status(200).send({ 
                    provider: provider,
                    message: "Can't getProviderMid !",
                    success: false
                })
            }        
        }
    })
}

module.exports = { getProviderMid }