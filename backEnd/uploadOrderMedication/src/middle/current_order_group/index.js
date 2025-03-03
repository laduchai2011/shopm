'use strict';
const { logEvents } = require('../../../logEvents');
const { serviceRedis } = require('../../model/serviceRedis');

/**
 * @typedef {import('../../typedef/index').orderMedication_typedef} orderMedication_typedef
*/

const timeExpireat = 60*60*24*30*12; // 1 year

function redis_create_a_store_for_current_order_group (uuid_user) {
    const key = `SHOPM_current_order_group_of_${uuid_user},_orderMedicationGroup`;
    const data = {}
    serviceRedis.setData(key, data, timeExpireat);
}

module.exports = { 
    redis_create_a_store_for_current_order_group
}