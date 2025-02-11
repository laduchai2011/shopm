const express = require('express');
const router = express.Router();

const { crudUser } = require('./src/model/CRUDDATABASE/CRUDUSER');
const { doctorOrPharmacist } = require('./src/model/CRUDDATABASE/CRUDDOCTORORPHARMACIST');
const { sickPerson } = require('./src/model/CRUDDATABASE/CRUDSICKPERSON');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication_SHOPM } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');

router.get('/', (req, res) => {
    res.send('get user infor')
});

router.get('/getUserWithPk_notification', 
    Authentication_SHOPM, 
    (req, res) => {
    const uuid_user = req.query.uuid_user;
    crudUser.readWithPk_notification(uuid_user, (user, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get user (getUserWithPk_notification) !",
                err: err,
                success: false
            })
        } else {
            if (user===null) return res.status(200).send({ 
                message: "Can't get doctorOrPharmacist !",
                user: user,
                success: false
            })
            return res.status(200).json({ 
                user: user,
                message: "Get doctorOrPharmacist successly !",
                success: true
            })
        }
    })
})

router.get('/doctorOrPharmacist/getfromCaseRecord', 
    Authentication_SHOPM, 
    (req, res) => {
    const uuid_doctorOrPharmacist = req.query.uuid_doctorOrPharmacist;
    doctorOrPharmacist.readFromCaseRecord(uuid_doctorOrPharmacist, (doctorOrPharmacist, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get doctorOrPharmacist !",
                err: err,
                success: false
            })
        } else {
            if (doctorOrPharmacist===null) return res.status(200).send({ 
                message: "Can't get doctorOrPharmacist !",
                doctorOrPharmacist: doctorOrPharmacist,
                success: false
            })
            return res.status(200).json({ 
                doctorOrPharmacist: doctorOrPharmacist,
                message: "Get doctorOrPharmacist successly !",
                success: true
            })
        }
    })
})

router.get('/sickPerson/getFromCaseRecord', 
    Authentication_SHOPM, 
    (req, res) => {
    const uuid_sickPerson = req.query.uuid_sickPerson;

    sickPerson.readWithFk(uuid_sickPerson, (sickPerson, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get sickPerson !",
                err: err,
                success: false
            })
        } else {
            if (sickPerson===null) return res.status(200).send({ 
                message: "Can't get sickPerson !",
                sickPerson: sickPerson,
                success: false
            })
            return res.status(200).json({ 
                sickPerson: sickPerson,
                message: "Get sickPerson successly !",
                success: true
            })
        }
    })
})

router.get('/doctorOrPharmacist/getfromCaseRecord/search', 
    Authentication_SHOPM, 
    (req, res) => {
    const uuid_doctorOrPharmacist = req.query.uuid_doctorOrPharmacist;
    doctorOrPharmacist.readFromCaseRecord(uuid_doctorOrPharmacist, (doctorOrPharmacist, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: "Can't get doctorOrPharmacist !",
                err: err,
                success: false
            })
        } else {
            if (doctorOrPharmacist===null) return res.status(200).send({ 
                message: "Can't get doctorOrPharmacist !",
                doctorOrPharmacist: doctorOrPharmacist,
                success: false
            })
            return res.status(200).json({ 
                doctorOrPharmacist: doctorOrPharmacist,
                message: "Get doctorOrPharmacist successly !",
                success: true
            })
        }
    })
})

module.exports = router;