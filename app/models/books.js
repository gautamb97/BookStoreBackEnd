/**
 * @description   : It is use to create schema in data base and doing schema vlidation.
 * @package       : mongoose
 * @file          : books.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }

}, {
  timestamps: true, versionKey: false
});

const BookModel = mongoose.model('Books', bookSchema);

class BooksModel {

  /**
* @description     : It is use to create and save a new note in data base.
* @param           : data
* @method          : save to save the coming data in data base
* @returns         : Promise
*/
  addBook = (data) => {
    const note = new BookModel({
      author: data.author,
      title: data.title,
      image: data.image,
      quantity: data.quantity,
      price: data.price,
      description: data.description,
    });
    return new Promise((resolve, reject) => {
      note.save()
        .then((book) => resolve(book))
        .catch((err) => reject(err));
    });
  }

  /**
   * @description   : It find all the existing books
   * @param {*} data
   * @param {*} callback
  */
  getAllBooks = () => {
    return new Promise((resolve, reject) => {
      BookModel.find()
        .then((book) => resolve(book))
        .catch((err) => reject(err));
    });
  }

  /**
   * @description   : It updating the existing book for the perticular user
   * @param {*} data
   * @returns       : Promise
  */
  updateBook = (data) => {
    return new Promise((resolve, reject) => {
      BookModel.findByIdAndUpdate(data.bookId, {
        author: data.author,
        title: data.title,
        image: data.image,
        quantity: data.quantity,
        price: data.price,
        description: data.description,
      })
        .then((book) => resolve(book))
        .catch((err) => reject(err));
    });
  }

  /**
   * @description   : It delete the existing book from the db
   * @param {*} data
   * @returns       : Promise
  */
  deleteBook = (data) => {
    return new Promise((resolve, reject) => {
      BookModel.findByIdAndRemove(data)
      .then((book) => resolve(book))
        .catch((err) => reject(err));
    })
  }

}

module.exports = new BooksModel();
