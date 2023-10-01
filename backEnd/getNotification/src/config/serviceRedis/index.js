const { createClient } = require('redis');

const clientRedis = createClient({
    url: 'redis://:@127.0.0.1:6379'
});

module.exports = { clientRedis }