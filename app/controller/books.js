/**
 * @description   : It is use to taking the request from the client and gives the response.
 * @file          : books.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const services = require('../services/books');
const validation = require('../utility/bookValidation');

class BookController {
  /**
   * @description : It is adding a book in bookstore.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : addBook from service.js
  */
  addBook = (req, res) => {
    try {
      const bookDetails = {
        author: req.body.author,
        title: req.body.title,
        image: req.body.image,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
      };
      const validationResult = validation.bookPropertyValidation.validate(bookDetails);
      if (validationResult.error) {
        res.status(400).send({
          success: false,
          message: 'Pass the proper format of all the fields',
          data: validationResult,
        });
        return;
      }
      services.addBook(bookDetails, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Unable to add book',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'new book added successfully',
          data,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is getting all existing books from bokkStore
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getAllBooks from service.js
  */
   getAllBooks = (req, res) => {
    try {
      services.getAllBooks(req, (error, result) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Unable to get the books',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'fetched books successfully',
          result,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is updating an existing note in fundooNotes for particular user.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : updateNote from service.js
  */
   updateBook = (req, res) => {
    try {
        const bookDetails = {
            author: req.body.author,
            title: req.body.title,
            image: req.body.image,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
            bookId: req.params.bookId,
          };
      const validationResult = validation.updateBookProperty.validate(bookDetails);
      if (validationResult.error) {
        res.status(400).send({
          success: false,
          message: 'the field can not be empty which you want to update in note',
          data: validationResult,
        });
        return;
      }
      services.updateBook(bookDetails, (error) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Unable to update book',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'book updated successfully',
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

module.exports = new BookController();
