'use strict';

function Authorization(req, res, next) {
    const { providerRole } = req.cookies;
    if (providerRole === 'admin') {
        next()
    } else {
        return res.status(200).json({
            medications: null,
            exist: false,
            success: false,
            message: 'There are not provider in your list !'
        });
    }
}

module.exports = { Authorization }
