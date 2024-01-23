'use strict';
const { orderMedicationCRUD } = require('../../model/CRUDDATABASE/CRUD_OrderMedication');
const { logEvents } = require('../../../logEvents');

function checkOrderMedicationWithCaseRecord(req, res, next) {
    const uuid_caseRecord = req.body.uuid_caseRecord;
    const pageNumber = req.body.pageNumber;

    orderMedicationCRUD.readWithCaseRecord(uuid_caseRecord, pageNumber, (orderMedication, err) => {
        if (err) {
            logEvents(`${req.url}---${req.method}---${err}`);
            return res.status(500).send(err);
        } else {
            if (orderMedication && orderMedication!==null) {
                return res.status(200).json({ 
                    orderMedication: orderMedication,
                    message: "OrderMedicationWithCaseRecord is exist !",
                    success: false,
                    isOrderMedication: true
                })
            }
            next();
        }
    })
}

module.exports = { checkOrderMedicationWithCaseRecord }