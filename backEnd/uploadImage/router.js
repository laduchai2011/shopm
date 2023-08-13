'use strict';
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// const { verifyToken } = require('./src/middle/checkToken');
const { crudImage } = require('./src/model/CRUDDATABASE/CRUDIMAGE');
const { Authentication } = require('./src/auth/Authentication');


router.get('/', (req, res) => {

    res.send('Successful response.');
});

router.post('/image', Authentication, (req, res) => {
    const data = req.body;
    const decodedToken = req.decodedToken;
    const imageUrls = data.imageUrls;
    const imagesOptionsArray = [];
    imageUrls.forEach(imageUrl => {
        const newImagesOptions = {
            tag: data.tag,
            content: data.content,
            url: imageUrl,
            uuidUser: decodedToken.data.uuid
        }
        imagesOptionsArray.push(newImagesOptions);
    });

    crudImage.bulkCreate(imagesOptionsArray, (err, images) => {
        if(err) {
            console.error(err)
            return res.status(500).send(err);
        }
        return res.status(201).json({
            message: 'Upload Image success !', 
            status: true,
            imageUrls: images
        })
    })
})

router.post('/image/upload', Authentication, (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" });
    }

    const files = req.files.file;
    const paths = [];
    const fileNames = [];
    const allPromise = [];
    let myFiles;

    if (files.length > 1) {
        myFiles = [].concat(files);
    } else {
        myFiles = [files];
    }

    for (let i = 0; i < myFiles.length; i++) {
        const time = new Date();
        // accessing the file
        const myFile = myFiles[i]; 
        
        let path = `${uuidv4()}-${time.toDateString()}-${myFile.name}`;
        //  mv() method places the file inside public directory
        const newPromise = new Promise((resolve, reject) => {
            myFile.mv(`${__dirname}/public/image/${path}`, function (err) {
                if (err) {
                    reject(err);
                } else {
                    // returing the response with file path and name
                    fileNames.push(myFile.name);
                    paths.push(path);

                    resolve();
                }
            });
        });

        allPromise.push(newPromise)
    }

    Promise.all(allPromise).then(() => {
        return res.status(201).json({
            message: 'Upload images successly !', 
            decodedToekn: req.decodedToken,
            status: true, 
            fileNames: fileNames,
            paths: paths
        })
    }).catch(err => {
        return res.status(500).send({ 
            message: "Error occured" ,
            err: err
        });
    })
});

module.exports = router;