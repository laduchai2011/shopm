const { caseRecord } = require('../../model/CRUDDATABASE/CRUDCASERECORD');
const { caseRecordPage } = require('../../model/CRUDDATABASE/CRUDCASERECORDPAGE');

const createCaseRecord = (caseRecordOptions, dataPage, callback) => { 
    let data = null;
    let err;

    new Promise((resolve, reject) => {
        caseRecord.create(caseRecordOptions, (caseRecord, err) => {
            if (err) {
                reject(err);
            } else {
                const uuid_caseRecord = caseRecord.dataValues.uuid_caseRecord;
                const caseRecordPageOptions = {
                    priceTotal: dataPage.priceTotal,
                    dataPage: JSON.stringify(dataPage),
                    status: 'notComplete',
                    uuid_caseRecord: uuid_caseRecord
                }
                caseRecordPage.create(caseRecordPageOptions, (caseRecordPage, err) => {
                    if (err) {
                        reject(err);
                    } else {
                        data = {
                            caseRecord: caseRecord,
                            caseRecordPage: caseRecordPage,
                            success: true,
                            message: 'Create case-record successly !'
                        }
                        resolve(data);
                    }
                })
            }
        })
    }).then(data => data = data).catch(error => err = error).finally(() => {
        callback(data, err);
    })
}

module.exports = { createCaseRecord }