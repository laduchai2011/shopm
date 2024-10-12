'use strict';

function isProviderMedication(req, res, next) {
    const providerMid = req.providerMid;
    const medicationMid = req.medicationMid;

    if (providerMid?.uuid_provider===medicationMid.uuid_provider) {
        next();
    } else {
        return res.status(200).send({ 
            message: `This medication is NOT of this provider !`,
            success: false
        })
    }
}

function isNormalMedication(req, res, next) {
    const medicationMid = req.medicationMid;

    if (medicationMid?.status==='normal') {
        next();
    } else {
        return res.status(200).send({ 
            message: `Medication' status is ${medicationMid?.status} !`,
            success: false
        })
    }
}

module.exports = { isProviderMedication, isNormalMedication }