'use strict';
const { logEvents } = require('./logEvents');
const { SvMessage } = require('./src/model/svMessage');
const { providerCRUD } = require('./src/model/CRUDDATABASE/CRUD_Provider');

(async () => {
    const svMessage = new SvMessage();
    await svMessage.init();

    await svMessage.receiveMessage('require__provider__via__uuid_provider', { unsubscribe: false }, (message) => {
        const uuid_provider = JSON.parse(message).uuid_provider;
        const id = JSON.parse(message).id;
        providerCRUD.read(uuid_provider, (provider, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } 

            svMessage.sendMessage(`feedback_require__provider__via__uuid_provider___${id}`, JSON.stringify({id: id, provider: provider, err: err }));
        })
    })

    await svMessage.receiveMessage('require__uuid_user__via__uuid_provider', { unsubscribe: false }, (message) => {
        const uuid_provider = JSON.parse(message).uuid_provider;
        const id = JSON.parse(message).id;
        providerCRUD.read(uuid_provider, (provider, err) => {
            if (err) {
                logEvents(`serviceMessage: ${err}`);
            } 

            svMessage.sendMessage(`feedback__require__uuid_user__via__uuid_provider___${id}`, JSON.stringify({id: id, provider: provider, err: err }));
        })
    })
})();