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

let secure_cookie = false;
if (process.env.NODE_ENV !== 'development') {
    secure_cookie = true;
}

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
                message: 'Signin success !',
                success: true
            });
            return res.status(200).json({
                user: userOptions,
                exist: true,
                message: 'Account or phone number is used !',
                success: false
            });
        }
    });
})

router.post('/login', (req, res) => {
    const loginOptions = req.body;
    crudUser.read(loginOptions, async (user, err) => {
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
            let newRefreshToken, newAccessToken;

            try {
                newRefreshToken = await token.createRefreshToken(secretKey, user);
                newAccessToken = await token.createAccessTokens(secretKey, user);
            } catch (error) {
                logEvents(`${req.url}---${req.method}---${error}`);
                return res.status(200).json({
                    message: 'Login failure !',
                    error: error,
                    success: false
                })
            }

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
            await serviceRedis.setData(keyServiceRedis, jsonValue, timeExpireat);

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

router.post('/logout', Authentication, (req, res) => {
    res.cookie('uid', '', {
        httpOnly: true,
        secure: secure_cookie,
        expires: new Date(Date.now()),
        // signed: true
    }).cookie('accessToken', '', {
        httpOnly: true, 
        secure: secure_cookie,
        expires: new Date(Date.now())
    }).cookie('refreshToken', '', {
        httpOnly: true, 
        secure: secure_cookie,
        expires: new Date(Date.now())
    }).cookie('loginCode', '', {
        httpOnly: true, 
        secure: secure_cookie,
        expires: new Date(Date.now())
    }).cookie('loginInfor', '', {
        secure: secure_cookie,
        expires: new Date(Date.now())
    })

    return res.status(200).json({
        success: true,
        message: 'Logout success !'
    });
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