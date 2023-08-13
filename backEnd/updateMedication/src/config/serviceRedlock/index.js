const Client = require("ioredis");
const { default: Redlock } = require("redlock");

const redis = new Client({
    url: 'redis://:@127.0.0.1:6379'
});

const serviceRedlock = new Redlock(
    [redis],
    {
        driftFactor: 0.01,
        retryCount: -1,
        retryDelay: 100, 
        retryJitter: 200, 
        automaticExtensionThreshold: 500
    }
);

serviceRedlock.on("error", (error) => {
    // Ignore cases where a resource is explicitly marked as locked on a client.
    // if (error instanceof ResourceLockedError) {
    //     console.error('test err------------------', error);
    //     return;
    // }
  
    // Log all other errors.
    console.error('test err===============', error);
});

module.exports = { serviceRedlock }


// const { serviceRedlock } = require('./src/config/serviceRedlock');

// const promise = () => {return new Promise( async (resolve, reject) => {
//     try {
//         let lock = await serviceRedlock.acquire(["a"], 10000);
//         await serviceRedlock.release(lock);
//         resolve(lock)
//     } catch (error) {
//         reject(error)
//     }

// })}

// promise().then(lock => console.log('lock1:', lock)).catch(err => console.error(err));
// promise().then(lock => console.log('lock2:', lock)).catch(err => console.error(err));