'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
// const { v4: uuidv4 } = require('uuid');

// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');
const { providerCRUD } = require('./src/model/CRUDDATABASE/CRUD_Provider');
const { providerAboutCRUD } = require('./src/model/CRUDDATABASE/CRUD_ProviderAbout');

const { getProviderMid } = require('./src/middle/getProviderMid');
const { isMyProvider } = require('./src/middle/isMyProvider');


router.post('/provider/create', Authentication, (req, res) => {
    const providerOptions = req.body;
    const userOptions = req.decodedToken.data;
    providerOptions.uuid_user = userOptions.uuid;
    providerCRUD.create(providerOptions, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (provider !== null) return res.status(201).json({
                provider: provider,
                exist: false,
                message: 'Signin provider successly !'
            });
            return res.status(205).json({
                providerOptions: providerOptions,
                provider: provider,
                exist: true,
                message: 'Signin provider NOT successly !'
            });
        }
    })
})

router.patch('/provider/delete', 
    Authentication, 
    getProviderMid,
    isMyProvider,
    (req, res) => {
    const providerOptions = req.body;
    const userOptions = req.decodedToken.data;
    providerOptions.uuid_user = userOptions.uuid;
    providerCRUD.delete(providerOptions, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (provider?.status==='delete') return res.status(201).json({
                provider: provider,
                success: true,
                message: 'Delete provider successly !'
            });
            return res.status(205).json({
                providerOptions: providerOptions,
                provider: provider,
                success: false,
                message: 'Delete provider NOT successly !'
            });
        }
    })
})

router.post('/provider/about/create', 
    Authentication, 
    getProviderMid,
    isMyProvider,
    (req, res) => {
    const providerAboutOptionsArray = req.body.providerAboutOptionsArray;
    providerAboutCRUD.bulkCreate(providerAboutOptionsArray, (providerAbout, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (providerAbout!==null && providerAbout) return res.status(201).json({
                providerAbout: providerAbout,
                success: true,
                message: 'Signin providerAbouts successly !'
            });
            return res.status(205).json({
                providerAbout: providerAbout,
                success: false,
                message: 'Signin providerAbouts NOT successly !'
            });
        }
    })
})

module.exports = router;