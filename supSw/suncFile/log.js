var fs = require("fs");

const logPathArr = [
    'D:/shopm/backEnd/getCaseRecord/logEvents/index.js',
    'D:/shopm/backEnd/getChest/logEvents/index.js',
    'D:/shopm/backEnd/getDepartment/logEvents/index.js',
    'D:/shopm/backEnd/getImage/logEvents/index.js',
    'D:/shopm/backEnd/getMedication/logEvents/index.js',
    'D:/shopm/backEnd/getNotification/logEvents/index.js',
    'D:/shopm/backEnd/getOrderMedication/logEvents/index.js',
    'D:/shopm/backEnd/getProvider/logEvents/index.js',
    'D:/shopm/backEnd/getProviderNews/logEvents/index.js',
    'D:/shopm/backEnd/getUserInfor/logEvents/index.js',
    'D:/shopm/backEnd/uploadCaseRecord/logEvents/index.js',
    'D:/shopm/backEnd/uploadChest/logEvents/index.js',
    'D:/shopm/backEnd/uploadDepartment/logEvents/index.js',
    'D:/shopm/backEnd/uploadImage/logEvents/index.js',
    'D:/shopm/backEnd/uploadMedication/logEvents/index.js',
    'D:/shopm/backEnd/uploadNotification/logEvents/index.js',
    'D:/shopm/backEnd/uploadOrderMedication/logEvents/index.js',
    'D:/shopm/backEnd/uploadProvider/logEvents/index.js',
    'D:/shopm/backEnd/uploadProviderNews/logEvents/index.js',
    'D:/shopm/backEnd/uploadUserInfor/logEvents/index.js',
    'D:/shopm/backEnd/socketSM/logEvents/index.js',
    'D:/shopm/backEnd/playVideo/logEvents/index.js',
    'D:/shopm/backEndTKSCompany/getChest/logEvents/index.js',
    'D:/shopm/backEndTKSCompany/getMember/logEvents/index.js',
    'D:/shopm/backEndTKSCompany/uploadChest/logEvents/index.js',
    'D:/shopm/backEndTKSCompany/uploadMember/logEvents/index.js',
]

const logPath = 'D:/shopm/log/index.js';      
// sync logEvents
fs.readFile(logPath, function (err, data) {
    if (err) {
        return console.error(err);
    }

    for (let i = 0; i < logPathArr.length; i++) {
        fs.writeFile(logPathArr[i], data, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("Ghi file thành công!");
        });
    }
    
});