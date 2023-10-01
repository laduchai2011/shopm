const amqplib = require('amqplib');
const { amqp_url } = require('../../config/serviceRabbitmq');

class ServiceRabbitmq {
    constructor() {}

    async connect() {
        try {
            this._connect = await amqplib.connect(amqp_url);
        } catch (error) {
            console.error(error);
        }
    }

    async setting({ nameQueue }) {
        try {
            this._nameQueue = nameQueue;

            this._channel = await this._connect.createChannel();

            this._channel.prefetch(100);

            this._channel.assertQueue(nameQueue, {
                durable: true,
                exclusive: true
            })
        } catch (error) {
            console.error(error);
        }
    }

    sendQueue({ msg }) {
        try {
            this._channel.sendToQueue(this._nameQueue, Buffer.from(msg), {
                persistent: true
            })
        } catch (error) {
            console.error(error);
        }
    }

    receiveQueue(callback) {
        try {
            this._channel.consume(this._nameQueue, msg => {
                // console.log(`Msg::::`, msg.content.toString())
                // console.log(`Msg::::`, msg)
                // setTimeout(function() {
                //     console.log(" [x] Done");
                //     channel.ack(msg);
                // }, 10000);
                callback(this._channel, msg)
            }, {
                noAck: false
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    close() {
        this._connect.close();
    }
}

const serviceRabbitmq = new ServiceRabbitmq();

module.exports = { serviceRabbitmq }