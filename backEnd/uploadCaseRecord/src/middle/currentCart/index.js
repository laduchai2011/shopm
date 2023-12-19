'use strict';
const { serviceRedis } = require('../../model/serviceRedis');

function currentCart(req, res, next) {
    const userOptions = req.decodedToken.data;
    const currentCartKey = `currentCart-${userOptions.uuid}`;
    serviceRedis.getData(currentCartKey, (currentCart) => {
        if (currentCart && currentCart!==null) {
            req.currentCart = currentCart;
            next();
        } else {
            return res.status(200).send({
                message: 'Get currentCart NOT successly !',
                success: false
            })
        }
    })
}

module.exports = { currentCart }