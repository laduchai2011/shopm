'use strict';
const { logEvents } = require('../../../logEvents');
const { SvMessage } = require('../../model/svMessage');
const { v4: uuidv4 } = require('uuid');

/**
*@typedef {
*uuid_medication: uuid,
*sold: int
*} soldMedicationList
*/ 

const svMessage = new SvMessage();
svMessage.init();

async function bulkUpdateSold(req, res, next) {
    const soldMedicationList = req.body.soldMedicationList;
    const _id = uuidv4(); 

    function bulkUpdateSold_small(message) {
        const medicationList = JSON.parse(message).medicationList;
        const err = JSON.parse(message).err;
        const id = JSON.parse(message).id;
        
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (_id === id) {
                if (medicationList?.success) {
                    next();
                } else {
                    return res.status(200).json({
                        message: medicationList.message,
                        success: false,
                        isOutOfMedication: true,
                        checkedType: 'outOfMedication'
                    })
                }
            } else {
                return res.status(200).json({
                    message: 'Medication that you buy is out of !',
                    success: false,
                    isOutOfMedication: true,
                    checkedType: 'outOfMedication'
                })
            }
        }
    }

    await svMessage.receiveMessage(`feedback__order__from__orderMedication___${_id}`, { unsubscribe: true }, bulkUpdateSold_small);
    svMessage.sendMessage('require__order__from__orderMedication', JSON.stringify({ id: _id, soldMedicationList: soldMedicationList }));
}


module.exports = { bulkUpdateSold }