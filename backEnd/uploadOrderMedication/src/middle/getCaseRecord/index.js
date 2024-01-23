'use strict';
const { SvMessage } = require('../../model/svMessge');
const { v4: uuidv4 } = require('uuid');

async function getCaseRecord(uuid_caseRecord) {
    const promise_getCaseRecord = new Promise(async (resolve, reject) => {
        const _id = uuidv4();

        function getCaseRecordFc(message) {
            const caseRecord = JSON.parse(message).caseRecord;
            const id = JSON.parse(message).id;
            console.log(222222222222222, JSON.parse(message))
            if (_id === id) {
                resolve(caseRecord);
            }
        }

        try {
            const svMessage = new SvMessage();
            await svMessage.init();
            await svMessage.receiveMessage(`feedback__caseRecord__from__orderMedication${_id}`, { unsubscribe: true }, getCaseRecordFc);
            svMessage.sendMessage('require__caseRecord__from__orderMedication', JSON.stringify({ id: _id, uuid_caseRecord: uuid_caseRecord }));
        } catch (error) {
            reject(error);
        }     
    })
    
    return promise_getCaseRecord;
};

module.exports = { getCaseRecord }