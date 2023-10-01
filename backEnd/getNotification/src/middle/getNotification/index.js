'use strict';

const { notification } = require('../../model/CRUDDATABASE/CRUDNOTIFICATION');

const getNotification = (uuid_user, type, pageIndex, pageSize, callback) => {
    const statusAraay = ['sent', 'receved', 'seen', 'read', 'deleted'];

    notification.bulkReadWithFk(uuid_user, pageIndex, pageSize, () => {

    })

    notification.readCountWithFk(uuid_user, type, statusAraay[1], () => {
        
    })

}

module.exports = { getNotification };