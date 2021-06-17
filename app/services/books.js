/**
 * @description   : It is work as a middleware between models and controller
 * @file          : note.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const models = require('../models/books');

class BookService {
  /**
   * @description   : It is used to adding a book taking data from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
  */
  addBook = (data, callback) => {
    models.addBook(data, callback)
  }
}

module.exports = new BookService();
