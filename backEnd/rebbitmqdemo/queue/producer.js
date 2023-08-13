const amqplib = require('amqplib');
const amqp_url = 'amqp://localhost:5672';

const sendQueue = async ({ msg }) => {
    try {
        const conn = await amqplib.connect(amqp_url);
        const channel = await conn.createChannel();
        const nameQueue = 'q1';

        await channel.assertQueue(nameQueue, {
            durable: true
        })

        channel.prefetch(1);

        const sent = await channel.sendToQueue(nameQueue, Buffer.from(msg), {
            persistent: true
        })

        console.log(sent)
    } catch (error) {
        console.error(error);
    }
}

let i = 0;
setInterval(() => {
    i = i + 1;
    sendQueue({ msg: `xin chao moi nguoi ${i}` })
}, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 2' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 3' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 4' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 5' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 6' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 7' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 8' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 9' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 10' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 11' })
// }, 1000)
// setInterval(() => {
//     sendQueue({ msg: 'xin chao moi nguoi 12' })
// }, 1000)