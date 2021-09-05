const Redis = require('ioredis')
const redis = new Redis()

redis.on("error", (err) => console.log(err))

module.exports = redis