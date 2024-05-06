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

async function isMyProvider (req, res, next) {
    const userOptions = req.decodedToken.data;
    const provider = req.providerMid;

    if (userOptions.uuid===provider.uuid_user) {
        next();
    } else {
        return res.status(200).send({ 
            provider: provider,
            message: "There are NOT this probider for you",
            success: false
        })
    }
}

module.exports = { isMyProvider }