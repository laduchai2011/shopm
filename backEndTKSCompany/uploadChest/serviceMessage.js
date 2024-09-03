'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { chestCRUD } = require('./src/model/CRUDDATABASE/CRUD_Chest');


(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__caseRecord__from__orderMedication', { unsubscribe: false }, (message) => {
        const uuid_caseRecord = JSON.parse(message).uuid_caseRecord;
        const id = JSON.parse(message).id;
        // caseRecordCRUD.read(uuid_caseRecord, (caseRecord, err) => {
        //     if (err) {
        //         logEvents(`serviceMessage: ${err}`);
        //     } else {
        //         svMessage.sendMessage(`feedback__caseRecord__from__orderMedication${id}`, JSON.stringify({id: id, caseRecord: caseRecord }))
        //     }
        // })
    })
    
})();