'use strict';

function isMyProvider(req, res, next) {
    const providerMid = req.providerMid;
    const uuid_user = req.decodedToken.data.uuid;

    if (providerMid?.uuid_user===uuid_user) {
        next();
    } else {
        return res.status(200).send({ 
            message: `This provider is NOT your !`,
            success: false
        })
    }
}

function isNormalProvider(req, res, next) {
    const providerMid = req.providerMid;

    if (providerMid?.status==='normal') {
        next();
    } else {
        return res.status(200).send({ 
            message: `Provider' status is ${providerMid?.status} !`,
            success: false
        })
    }
}

module.exports = { isMyProvider, isNormalProvider }