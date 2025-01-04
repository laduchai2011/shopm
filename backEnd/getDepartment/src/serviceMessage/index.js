'use strict';
const WithServerGChest = require('./withServerGChest').default;

class ServiceMessage {
    constructor (svMessage) {
        this._svMessage = svMessage;
    }

    withServerGChest() {
        const withServerGChest = new WithServerGChest(this._svMessage);
        withServerGChest.required__All__Uuid_DepatmentGroup__By__Uuid_Provider();
        withServerGChest.required__All__Uuid_Depatment__By__Uuid_DepatmentGroup();
    }
}

module.exports.default = ServiceMessage;