const express = require('express');
const router = express.Router();

// const { curdUser } = require('./src/model/CRUDDATABASE/CRUDUSER');
const { doctorOrPharmacist } = require('./src/model/CRUDDATABASE/CRUDDOCTORORPHARMACIST');
const { sickPerson } = require('./src/model/CRUDDATABASE/CRUDSICKPERSON');
// const { serviceRedis } = require('./src/model/serviceRedis');
const { Authentication } = require('./src/auth/Authentication');
const { logEvents } = require('./logEvents');

router.get('/', (req, res) => {
    res.send('get user infor')
});

router.get('/doctorOrPharmacist/getfromCaseRecord', Authentication, (req, res) => {
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

router.get('/sickPerson/getfromCaseRecord', Authentication, (req, res) => {
    const uuid_user = req.query.uuid_user;
    // console.log(uuid_user)
    sickPerson.readWithFk(uuid_user, (sickPerson, err) => {
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

router.get('/doctorOrPharmacist/getfromCaseRecord/search', Authentication, (req, res) => {
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