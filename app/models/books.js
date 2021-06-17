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
  price: { type: Number, required: true},
  description: { type: String, required: true}

}, {
  timestamps: true, versionKey: false
});

const BookModel = mongoose.model('Books', bookSchema);

class BooksModel {

     /**
 * @description     : It is use to create and save a new note in data base.
 * @param           : data, callback
 * @method          : save to save the coming data in data base
*/
  addBook = (data, callback) => {
    const note = new BookModel({
        author: data.author,
        title: data.title,
        image: data.image,
        quantity: data.quantity,
        price: data.price,
        description: data.description,
    });
    note.save()
      .then((dataOne) => {
        callback(null, dataOne);
      });
  }

}

module.exports = new BooksModel();
