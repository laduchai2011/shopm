var fs = require("fs");

const modelPathArr = [
    'D:/shopm/backEnd/getCaseRecord/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getChest/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getDepartment/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getImage/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getMedication/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getNotification/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getOrderMedication/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getProvider/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getProviderNews/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/getUserinfor/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadCaseRecord/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadChest/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadDepartment/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadImage/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadMedication/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadNotification/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadOrderMedication/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadProvider/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadProviderNews/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/uploadUserinfor/src/model/CRUDDATABASE/defineModel/index.js',
    'D:/shopm/backEnd/socketSM/src/model/CRUDDATABASE/defineModel/index.js'
]

// const typedefPathArr = [
//     'D:/shopm/backEnd/getCaseRecord/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getImage/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getMedication/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getNotification/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getOrderMedication/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getProvider/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getProviderNews/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/getUserinfor/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadCaseRecord/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadImage/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadMedication/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadNotification/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadOrderMedication/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadProvider/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadProviderNews/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/uploadUserinfor/src/model/CRUDDATABASE/defineModel/typedef.js',
//     'D:/shopm/backEnd/socketSM/src/model/CRUDDATABASE/defineModel/typedef.js'
// ]

const modelPath = 'D:/shopm/database/shopm/defineDB/src/model/CRUDDATABASE/defineModel/index.js';                                                     


fs.readFile(modelPath, function (err, data) {
    if (err) {
        return console.error(err);
    }

    for (let i = 0; i < modelPathArr.length; i++) {
        fs.writeFile(modelPathArr[i], data, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("Ghi file thành công!");
        });
    }
    
});