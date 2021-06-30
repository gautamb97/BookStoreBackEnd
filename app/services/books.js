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
    addBook = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.addBook(data);
            result.then((book) => {
                redis.updateRedis(data);
                resolve(book);
            }
            ).catch((err) => reject(err));
        });
    }

    /**
     * @description   : It is used to find all existing books taking data from controller
     *                  and sending to models
     * @param {data}  : it contains data which we are passing from body
     * @returns       : books which we are fetching
    */
    getAllBooks = () => {
        const KEY = 'books';
        return new Promise((resolve, reject) => {
            const result = models.getAllBooks();
            result.then((booksData) => {
                redis.setRedis(KEY, booksData);
                resolve(booksData)
            }
            ).catch((err) => reject(err));
        });
    }

    /**
     * @description   : It is used to update an existing book taking data from controller
     *                  and sending to models
     * @param {data}  : it contains data which we are passing from body
    */
    updateBook = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.updateBook(data);
            result.then((book) => resolve(book)
            ).catch((err) => reject(err));
        });
    }

    /**
   * @description   : It is used to fetch an existing book taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
  */
     getBook = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.getBook(data);
            result.then((book) => resolve(book)
            ).catch((err) => reject(err));
        });
    }

    /**
   * @description   : It is used to delete an existing book taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
  */
    deleteBook = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.deleteBook(data);
            result.then((book) => resolve(book)
            ).catch((err) => reject(err));
        });
    }
}

module.exports = new BookService();
