const { serviceRabbitmq } = require('./src/middle/serviceRabbitmq');

(async () => {
    await serviceRabbitmq.connect();
    await serviceRabbitmq.setting({ nameQueue: 'update medication amout in order' });
    serviceRabbitmq.receiveQueue((channel, msg) => {
        console.log(`Msg::::`, msg.content.toString())
    })
})()