'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { logCRUD } = require('./src/model/CRUDDATABASE/CRUD_Log');

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__TKS_log_Error', { unsubscribe: false }, (message) => {
        const logOptions = JSON.parse(message).logOptions;
        const id = JSON.parse(message).id;
        console.log(2222222222, logOptions)
        logCRUD.create(logOptions, (log, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } else {
                console.log(2222222222, log)
                svMessage.sendMessage(`feedback__TKS_log_Error___${id}`, JSON.stringify({id: id, log: log }))
            }
        })
    })
    
})();