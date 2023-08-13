const amqplib = require('amqplib');
const amqp_url = 'amqp://localhost:5672';

const receiveQueue = async () => {
    try {
        const conn = await amqplib.connect(amqp_url);
        const channel = await conn.createChannel();
        const nameQueue = 'q1';

        await channel.assertQueue(nameQueue, {
            durable: true
        })

        channel.prefetch(1);

        await channel.consume(nameQueue, msg => {
            console.log(`Msg::::`, msg.content.toString())
            // console.log(`Msg::::`, msg)
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
            }, 10000);
        }, {
            noAck: false
        })
    } catch (error) {
        console.error(error);
    }
}

receiveQueue()