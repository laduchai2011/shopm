'use strict';
const { SvMessage } = require('../../model/svMessge');
const { v4: uuidv4 } = require('uuid');

async function getProvider(uuid_provider, callback) {
    const _id = uuidv4();
    const svMessage = new SvMessage();

    function getProviderkFc(message) {
        const id = JSON.parse(message).id;
        const provider = JSON.parse(message).provider;
        const err = JSON.parse(message).err;
        
        if (_id === id) {
            callback(provider, err);
        }
    }

    await svMessage.init();

    await svMessage.receiveMessage(`feedback_require__provider__via__uuid_provider___${_id}`, { unsubscribe: true }, getProviderkFc);
    svMessage.sendMessage('require__provider__via__uuid_provider', JSON.stringify({ id: _id, uuid_provider: uuid_provider }));
}

module.exports = { getProvider }