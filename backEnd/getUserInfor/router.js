const express = require('express');
const router = express.Router();

const { curdUser } = require('./src/model/CRUDDATABASE/CRUDUSER');
const { doctorOrPharmacist } = require('./src/model/CRUDDATABASE/CRUDDOCTORORPHARMACIST');
const { sickPerson } = require('./src/model/CRUDDATABASE/CRUDSICKPERSON');
// const { serviceRedis } = require('./src/model/serviceRedis');

router.get('/', (req, res) => {
    res.send('get user infor')
});

router.get('/login', (req, res) => {
    const loginInfor = req.body;
    curdUser.getUser(loginInfor, (user, err) => {
        // if (err) return res.status(500).send(err);
        // if (user !== null) return res.status(200).json({
        //     user: user,
        //     exist: false,
        //     message: 'Success !'
        // });
        // return res.status(200).json({
        //     user: userOptions,
        //     exist: true,
        //     message: 'Account or phone number is used !'
        // });
        console.log(user, err)
    });
})

router.get('/doctorOrPharmacist/getfromCaseRecord', (req, res) => {
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
            if (caseRecord===null) return res.status(200).send({ 
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

router.get('/sickPerson/getfromCaseRecord', (req, res) => {
    const uuid_user = req.query.uuid_user;
    console.log(uuid_user)
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

module.exports = router;