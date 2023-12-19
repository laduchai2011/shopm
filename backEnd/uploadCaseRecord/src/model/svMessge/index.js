'use strict';
const { Publisher } = require('./publisher');
const { Subscriber } = require('./subscriber');

class SvMessage {
    constructor() {
        this.publisher = new Publisher();
        this.subscriber = new Subscriber();
    }

    async init() {
        this._publisher = await this.publisher.init();
        this._subscriber = await this.subscriber.init();
    }

    sendMessage(key, value) { 
        this._publisher.publish(key, value);
    }

    async receiveMessage(key, { unsubscribe: unsubscribe }, callback) {
        await this._subscriber.subscribe(key, async (message, channel) => {
            if (unsubscribe) {
                await this._subscriber.unsubscribe(channel);
            }
            callback(message);
        });
    }
}

module.exports = { SvMessage }