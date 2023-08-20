const { orderAllMedication } = require('../../model/CRUDDATABASE/CRUDORDERALLMEDICATION');
const { orderMedication } = require('../../model/CRUDDATABASE/CRUDORDERMEDICATION');
const { paymentMedication } = require('../../model/CRUDDATABASE/CRUDPAYMENTMEDICATION');
const { transport } = require('../../model/CRUDDATABASE/CRUDTRANSPORT');

const orderAllMedicationPromise_read = (uuid_user, uuid_orderAllMedication) => {
    return new Promise((resolve, reject) => {
        orderAllMedication.read(uuid_user, uuid_orderAllMedication, (orderAllMedication, err) => {
            if (err) reject(err);
            resolve(orderAllMedication);
        })
    })
} 

const orderMedicationPromise_bulkRead_withFkOrderAllMedication = (uuid_orderAllMedication) => {
    return new Promise((resolve, reject) => {
        orderMedication.bulkRead(uuid_orderAllMedication, (orderMedications, err) => {
            if (err) reject(err);
            resolve(orderMedications);
        })
    })
}

const paymentMedicationPromise_read_withFkOrderAllMedication = (uuid_orderAllMedication) => {
    return new Promise((resolve, reject) => {
        paymentMedication.read(uuid_orderAllMedication, (paymentMedication, err) => {
            if (err) reject(err);
            resolve(paymentMedication);
        })
    })
}

const transportPromise_read_withFkOrderAllMedication = (uuid_orderAllMedication) => {
    return new Promise((resolve, reject) => {
        transport.read(uuid_orderAllMedication, (transport, err) => {
            if (err) reject(err);
            resolve(transport);
        })
    })
}

const readFinalMedicationOrder = (uuid_user, uuid_orderAllMedication, callback) => {
    let data = null;
    let err;
    Promise.all([
        orderAllMedicationPromise_read(uuid_user, uuid_orderAllMedication), 
        orderMedicationPromise_bulkRead_withFkOrderAllMedication(uuid_orderAllMedication), 
        paymentMedicationPromise_read_withFkOrderAllMedication(uuid_orderAllMedication),
        transportPromise_read_withFkOrderAllMedication(uuid_orderAllMedication)
    ]).then((values) => {
        if (values.length === 4) {
            data = {
                data: values,
                success: true,
                message: 'Get order medication successly !'
            }
        } else {
            data = {
                data: values,
                success: true,
                message: 'Get order medication NOT successly, There are Not this medication !'
            }
        }
    }).catch(error => {
        err = error;
    }).finally(() => {
        callback(data, err);
    })
}

module.exports = { readFinalMedicationOrder }