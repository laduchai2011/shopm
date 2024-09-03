'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { medicationCRUD } = require('./src/model/CRUDDATABASE/CRUD_Medication');

/**
*@typedef {
*uuid_medication: uuid,
*sold: int
*} soldMedicationList
*/ 

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__order__from__orderMedication', { unsubscribe: false }, (message) => {
        const soldMedicationList = JSON.parse(message).soldMedicationList;
        const id = JSON.parse(message).id;
        medicationCRUD.bulkUpdateSold(soldMedicationList, (medicationList, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } 
            svMessage.sendMessage(`feedback__order__from__orderMedication___${id}`, JSON.stringify({
                id: id,
                err: err,
                medicationList: medicationList 
            }))
        })
    })
    
})();