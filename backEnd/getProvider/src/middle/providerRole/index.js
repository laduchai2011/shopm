'use strict';

/**
*@typedef {
*name: string,
*avatar: string,
*banner: text,
*follow: integer,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_user: uuid
*} providerOptions
*/

const ROLES = ['provider_admin'];

async function getProviderRole (userOptions, provider) {
    let err;

    if (userOptions.uuid===provider.uuid_user) {
        return { role: 'provider_admin', err: err };
    } else {
        return { role: 'provider_noRole', err: err };
    }
}

function providerRole(req, res, next) {
    const userOptions = req.decodedToken.data;
    const provider = req.providerMid;

    const { role, err } = getProviderRole(userOptions, provider);

    if (err) {
        return res.status(200).send({ 
            err: err,
            message: "You can't access this provider !",
            success: false
        })
    } else {
        if (ROLES.includes(role)) {
            req.providerRole = role;
            next();
        }
        return res.status(200).send({ 
            err: err,
            message: "You can't access this provider !",
            success: false
        })
    }
}

module.exports = { providerRole }