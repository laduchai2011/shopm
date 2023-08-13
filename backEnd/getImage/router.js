'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { crudImage } = require('./src/model/CRUDDATABASE/CRUDIMAGE');
const { Authentication } = require('./src/auth/Authentication');
// const { verifyToken } = require('./src/middle/checkToken');

router.get('/', (req, res) => {
    res.send('get images');
})

router.get('/image/list', (req, res) => {
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    crudImage.bulkRead(Number(pageIndex), Number(pageSize), (err, images) => {
        if (err) return res.status(500).send({ 
            message: "Can't get images" ,
            err: err,
            status: false
        });
        return res.status(200).json({ 
            message: "Get images successly" ,
            images: images,
            status: true
        });
    });
})

router.get('/image/list/manager', Authentication, (req, res) => {
    const decodedToken = req.decodedToken;
    const uuidUser = decodedToken.data.uuid;
    const pageIndex = req.query.pageIndex;
    const pageSize = req.query.pageSize;
    crudImage.bulkReadFilter(uuidUser, Number(pageIndex), Number(pageSize), (err, images) => {
        if (err) return res.status(500).send({ 
            message: "Can't get images" ,
            err: err,
            status: false
        });
        return res.status(200).json({ 
            message: "Get images successly" ,
            images: images,
            status: true
        });
    });
})

module.exports = router;