const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
client.on('error', (err) => {
  console.log(err);
});

const redisAction = {
  set: (key, value) => {
    client.set(key, value);
    return true;
  },
  get: (key, value) => {
    client.get(key, value);
    return true;
  },
  del: (key) => {
    client.del(key);
    return true;
  },
};
module.exports = redisAction;
