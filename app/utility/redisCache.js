/**
 * @description   : It is work as a middleware between models and controller
 * @file          : redisCache.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const redis = require('redis');

const client = redis.createClient();

class Redis {
    /**
     *@description      : it is used set the redis db for caching
     *@param {*} KEY
     *@param  {*} data
    */
    setRedis(KEY, data) {
        client.setex(KEY, 7200, JSON.stringify(data));
    }

}
module.exports = new Redis();
