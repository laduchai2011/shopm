'use strict';
require('dotenv').config();
const { SvMessage } = require('../../model/svMessage');
const { v4: uuidv4 } = require('uuid');


async function getMedication(uuid_medication, callback) {
    const _id = uuidv4();
    const svMessage = new SvMessage();

    function getMedicationFc(message) {
        const id = JSON.parse(message).id;
        const medication = JSON.parse(message).medication;
        const err = JSON.parse(message).err;
        
        if (_id === id) {
            callback(medication, err);
        }

        svMessage.close();
    }

    await svMessage.init();

    await svMessage.receiveMessage(`feedback_require__medication__via__uuid_medication___${_id}`, { unsubscribe: true }, getMedicationFc);
    svMessage.sendMessage('require__medication__via__uuid_medication', JSON.stringify({ id: _id, uuid_medication: uuid_medication }));
}

function getMedicationMid(req, res, next) {
    const uuid_medication = req.body.departmentOptions.uuid_medication;
    getMedication(uuid_medication, (medication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send({ 
                message: `Can't get Medication !`,
                err: err,
                success: false
            })
        } else {
            if (medication && medication!==null) {
                req.medicationMid = medication;
                next();
            } else {
                return res.status(200).json({
                    success: false,
                    message: `This medication is NOT your !`,
                })
            }
        }
    })
}

module.exports = { getMedication, getMedicationMid }