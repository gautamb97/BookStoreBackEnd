/**
 * @description   : It is work as a middleware between models and controller
 * @file          : note.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const models = require('../models/books');
const redis = require('../utility/redisCache');

class BookService {
    /**
     * @description   : It is used to adding a book taking data from controller and sending to models
     * @param {data}  : it contains data which we are passing from body
    */
    addBook = (data, callback) => {
        models.addBook(data, callback)
    }

    /**
     * @description   : It is used to find all existing books taking data from controller
     *                  and sending to models
     * @param {data}  : it contains data which we are passing from body
     * @returns       : notes which we are fetching
    */
    getAllBooks = (data, callback) => {
        const KEY = 'books';
        models.getAllBooks(data, (error, result) => {
            console.log('comming to service');
            if (error) {
                callback(error, null);
            } else {
                redis.setRedis(KEY, result);
                callback(null, result);
            }
        });
    }

    /**
     * @description   : It is used to update an existing book taking data from controller
     *                  and sending to models
     * @param {data}  : it contains data which we are passing from body
    */
    updateBook = (data, callback) => {
        models.updateBook(data, callback)
    }

    /**
   * @description   : It is used to delete an existing book taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
  */
  deleteBook = (data, callback) => {
    models.deleteBook(data, callback)
  }
}

module.exports = new BookService();
