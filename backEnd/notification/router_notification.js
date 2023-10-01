'use strict';
require('dotenv').config();
const { logEvents } = require('./logEvents');
const notification_require_examine = require('./src/notifications/notification_require_examine');


const notification_type = process.env.NODE_ENV_NOTIFICATION_TYPE;

function router_notification () {
    
    switch (notification_type) {
        case 'notification_require_examine':
            notification_require_examine();
            break;
    
        default:
            logEvents('(router_notification) Notify type is invalid !');
            break;
    }
}

module.exports = router_notification;