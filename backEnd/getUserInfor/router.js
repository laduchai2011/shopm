const express = require('express');
const router = express.Router();

const { curdUser } = require('./src/model/CRUDDATABASE/CRUDUSER');
const { serviceRedis } = require('./src/model/serviceRedis');

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

module.exports = router;