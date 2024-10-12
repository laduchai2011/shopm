'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { medicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_Medication');

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__medication__via__uuid_medication', { unsubscribe: false }, (message) => {
        const uuid_medication = JSON.parse(message).uuid_medication;
        const id = JSON.parse(message).id;
        medicationCRUD.readWithUid(uuid_medication, (medication, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } 

            svMessage.sendMessage(`feedback_require__medication__via__uuid_medication___${id}`, JSON.stringify({id: id, medication: medication, err: err }));
        })
    })
})();