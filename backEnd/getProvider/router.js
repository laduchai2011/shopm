'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { providerCRUD } = require('./src/model/CRUDDATABASE/CRUD_Provider');
const { crudProviderAbout } = require('./src/model/CRUDDATABASE/CRUDPROVIDERABOUT');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');
// const { Authorization } = require('./src/auth/Authorization');


router.get('/provider/list', Authentication, (req, res) => {
    const { uid } = req.cookies;
    providerCRUD.readList(uid, (providers, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (providers === null) return res.status(200).json({
                providers: providers,
                success: false,
                message: 'There are not provider registed yet !'
            });
            return res.status(200).json({
                providers: providers,
                success: true,
                message: 'Get successly providers (it is a array) !'
            });
        }
    });
});

router.get('/provider/:id', (req, res) => {
    const uuid_provider = req.params.id;
    const { uid } = req.cookies;
    providerCRUD.read(uuid_provider, (provider, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (provider === null) return res.status(200).json({
                provider: provider,
                exist: false,
                success: false,
                message: 'There are not provider registed yet !'
            });
            const nProvider = {...provider.dataValues}
            res.cookie('providerRole', nProvider.uuid_user === uid ? 'admin' : 'normal')
            return res.status(200).json({
                provider: provider,
                exist: true,
                success: true,
                message: 'Get successly provider !'
            });
        }
    })
})

router.get('/provider/about/list', (req, res) => {
    const uuid_provider = req.query.uuid_provider;
    crudProviderAbout.readList(uuid_provider, (providerAbouts, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (providerAbouts === null) return res.status(200).json({
                providerAbouts: providerAbouts,
                exist: false,
                message: 'There are not providerAbouts registed yet !'
            });
            return res.status(200).json({
                providerAbouts: providerAbouts,
                exist: true,
                message: 'Get successly providerAbouts (it is a array) !'
            });
        }
    });
});

module.exports = router;