'use strict';
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// const { adminFirebase } = require('./src/config/firebase');
const { crudUser } = require('./src/model/CRUDDATABASE/CRUDUSER');
const { doctorOrPharmacist } = require('./src/model/CRUDDATABASE/CRUDDOCTORORPHARMACIST');
const { sickPerson } = require('./src/model/CRUDDATABASE/CRUDSICKPERSON');
const { token } = require('./src/model/token');
const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');


router.post('/signup', (req, res) => {
    const userOptions = req.body;
    crudUser.create(userOptions, (user, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (user !== null) return res.status(201).json({
                user: user,
                exist: false,
                message: 'Signin success !'
            });
            return res.status(205).json({
                user: userOptions,
                exist: true,
                message: 'Account or phone number is used !'
            });
        }
    });
})

router.post('/login', (req, res) => {
    const loginOptions = req.body;
    crudUser.read(loginOptions, (user, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (user === null) return res.status(200).json({
                user: user,
                exist: false,
                message: 'Login failure. Account or password is incorrect !'
            });

            const loginCode = uuidv4();

            // create token
            const secretKey = uuidv4();
            const newRefreshToken = token.createRefreshToken(secretKey, user);
            const newAccessToken = token.createAccessTokens(secretKey, user);

            // cache refreshToken in redis
            const keyServiceRedis = `token-${ user.dataValues.uuid }-${ loginCode }`;
            // console.log(keyServiceRedis)
            const jsonValue = { 
                secretKey: secretKey,
                refreshToken: newRefreshToken, 
                accessToken: newAccessToken,
                refreshToken_used: []
            };
            const timeExpireat = 60*60*24*30*12; // 1 year
            serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);
        
            let secure_cookie = false;
            if (process.env.NODE_ENV !== 'development') {
                secure_cookie = true;
            }

            res.cookie('uid', user.dataValues.uuid, {
                httpOnly: true,
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                // signed: true
            }).cookie('accessToken', newAccessToken, {
                httpOnly: true, 
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }).cookie('refreshToken', newRefreshToken, {
                httpOnly: true, 
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }).cookie('loginCode', loginCode, {
                httpOnly: true, 
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }).cookie('loginInfor', JSON.stringify(user.dataValues), {
                secure: secure_cookie,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            })

            return res.status(201).json({
                user: user,
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
                exist: true,
                message: 'Login success !'
            });
        }
    })
})

router.post('/registerDoctorOrPharmacist', Authentication, (req, res) => {   
    const doctorOrPharmacistOptions = req.body;
    const userOptions = req.decodedToken.data;
    doctorOrPharmacistOptions.uuid_user = userOptions.uuid;
    doctorOrPharmacist.create(doctorOrPharmacistOptions, (doctorOrPharmacist, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (doctorOrPharmacist === null) return res.status(200).json({
                doctorOrPharmacist: doctorOrPharmacist,
                exist: true,
                success: false,
                message: 'Create doctor or pharmacist not successly !'
            });

            return res.status(201).json({
                doctorOrPharmacist: doctorOrPharmacist,
                exist: false,
                success: true,
                message: 'Create doctor or pharmacist successly !'
            });
        }
    })
})

router.post('/sickPerson/create', Authentication, (req, res) => {   
    const sickpersonOptions = req.body;
    const userOptions = req.decodedToken.data;
    sickpersonOptions.uuid_user = userOptions.uuid;
    sickPerson.create(sickpersonOptions, (sickPerson, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (sickPerson === null) return res.status(200).json({
                sickPerson: sickPerson,
                exist: true,
                success: false,
                message: 'Create doctor or sick-person not successly !'
            });

            return res.status(201).json({
                sickPerson: sickPerson,
                exist: false,
                success: true,
                message: 'Create doctor or sick-person successly !'
            });
        }
    })
})

module.exports = router;