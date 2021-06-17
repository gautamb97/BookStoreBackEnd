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

    /**
 *@description      : it is used get data from the redis db for caching
 *@param {*} req
 *@param  {*} res
 *@param {*} next
*/
redisCache(req, res, next) {
    client.get('books', (err, books) => {
      if (err) throw err;
  
      if (books !== null) {
        console.log('books fetch from redis');
        res.send({
          succes: true,
          message: 'fetching from redis',
          data: JSON.parse(books),
        });
      } else {
        next();
      }
    });
  }

}
module.exports = new Redis();
