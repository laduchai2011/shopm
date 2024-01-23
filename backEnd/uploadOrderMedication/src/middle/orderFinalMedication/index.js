const { orderAllMedication } = require('../../model/CRUDDATABASE/CRUDORDERALLMEDICATION');
const { orderMedicationCRUD } = require('../../model/CRUDDATABASE/CRUD_OrderMedication');
const { paymentMedication } = require('../../model/CRUDDATABASE/CRUDPAYMENTMEDICATION');
const { transport } = require('../../model/CRUDDATABASE/CRUDTRANSPORT');

const orderAllMedicationPromise_update = (uuid_orderAllMedication, orderAllMedicationOptions) => {
    return new Promise((resolve, reject) => {
        orderAllMedication.update(uuid_orderAllMedication, orderAllMedicationOptions, (orderAllMedication, err) => {
            if (err) reject(err);
            resolve(orderAllMedication);
        })
    })
} 

const orderAllMedicationPromise_create = (orderAllMedicationOptions) => {
    return new Promise((resolve, reject) => {
        orderAllMedication.create(orderAllMedicationOptions, (orderAllMedication, err) => {
            if (err) reject(err);
            resolve(orderAllMedication);
        })
    })
} 

const orderMedicationPromise_bulkCreate = (orderMedicationOptionsList) => {
    return new Promise((resolve, reject) => {
        orderMedicationCRUD.bulkCreate(orderMedicationOptionsList, (orderMedications, err) => {
            if (err) reject(err);
            resolve(orderMedications);
        })
    })
}

const paymentMedicationPromise_create = (paymentMedicationOptions) => {
    return new Promise((resolve, reject) => {
        paymentMedication.create(paymentMedicationOptions, (paymentMedication, err) => {
            if (err) reject(err);
            resolve(paymentMedication);
        })
    })
}

const transportPromise_create = (transportOptions) => {
    return new Promise((resolve, reject) => {
        transport.create(transportOptions, (transport, err) => {
            if (err) reject(err);
            resolve(transport);
        })
    })
}

const orderFinalMedication = (uuid_user, orderFinalMedicationOptions, callback) => {
    let data = null;
    let err;
    let uuid_orderAllMedication = orderFinalMedicationOptions.paymentMedicationOptions.uuid_orderAllMedication;
    if (uuid_orderAllMedication.length > 0) {
        Promise.all([
            orderAllMedicationPromise_update(uuid_orderAllMedication, orderFinalMedicationOptions.orderAllMedicationOptions), 
            orderMedicationPromise_bulkCreate(orderFinalMedicationOptions.orderMedicationOptionsList), 
            paymentMedicationPromise_create(orderFinalMedicationOptions.paymentMedicationOptions),
            transportPromise_create(orderFinalMedicationOptions.transportOptions)
        ]).then((values) => {
            data = {
                data: values,
                success: true,
                message: 'Create order medication successly !'
            }
        }).catch(error => {
            err = error;
        }).finally(() => {
            callback(data, err);
        })
    } else {
        const orderFinalMedicationOptions_m = orderFinalMedicationOptions;
        orderFinalMedicationOptions_m.orderAllMedicationOptions.uuid_user = uuid_user;
        orderAllMedicationPromise_create(orderFinalMedicationOptions_m.orderAllMedicationOptions).then(orderAllMedication => {
            if (orderAllMedication === null) {
                data = {
                    orderAllMedication: orderAllMedication,
                    success: false,
                    message: 'Create order medication not successly !'
                }
            } else {
                const uuid_orderAllMedication = orderAllMedication.dataValues.uuid_orderAllMedication;
                const orderMedicationOptionsList = orderFinalMedicationOptions_m.orderMedicationOptionsList;
                const paymentMedicationOptions = orderFinalMedicationOptions_m.paymentMedicationOptions;
                const transportOptions = orderFinalMedicationOptions_m.transportOptions;

                for (let i = 0; i < orderMedicationOptionsList.length; i++) {
                    orderMedicationOptionsList[i].uuid_orderAllMedication = uuid_orderAllMedication;
                }

                paymentMedicationOptions.uuid_orderAllMedication = uuid_orderAllMedication;
                transportOptions.uuid_orderAllMedication = uuid_orderAllMedication;

                Promise.all([
                    orderMedicationPromise_bulkCreate(orderMedicationOptionsList), 
                    paymentMedicationPromise_create(paymentMedicationOptions),
                    transportPromise_create(transportOptions)
                ]).then((values) => {
                    // console.log(values[0][0])
                    data = {
                        orderAllMedication: orderAllMedication,
                        data: values,
                        success: true,
                        message: 'Create order medication successly !'
                    }
                }).catch(error => {
                    err = error;
                }).finally(() => {
                    callback(data, err)
                })
            }
        }).catch(error => {
            err = error;
        })
    }
}

module.exports = { orderFinalMedication }