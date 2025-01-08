'use strict';
const express = require('express');
const router = express.Router();




router.get('/hello', (req, res) => {
    res.send({
        data: '123',
        type: 1
    });
})

module.exports = router;