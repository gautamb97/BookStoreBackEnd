/**
 * @description   : It is use to route the APIs
 * @file          : routes.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const controller = require('../controller/registration');
const booksController = require('../controller/books');
const cartController = require('../controller/cart')
const redis = require('../utility/redisCache');
const helper = require('../utility/helper');
module.exports = (app) => {

    app.post('/userRegistration', helper.setRole('user'), controller.register);

    app.post('/adminRegistration', helper.setRole('admin'), controller.register);

    app.post('/adminLogin', helper.checkRole('admin'), controller.login);

    app.post('/userLogin', helper.checkRole('user'), controller.login);

    app.post('/forgotPassword', controller.forgotPassword);

    app.post('/resetPassword', helper.verifyToken, controller.resetPassword);

    app.post('/books', helper.verifyRole, booksController.addBook);

    app.get('/books', helper.verifyToken, redis.redisCache , booksController.getAllBooks);

    app.put('/books/:bookId', helper.verifyRole, booksController.updateBook);

    app.delete('/books/:bookId', helper.verifyRole, booksController.deleteBook);

    app.post('/addToCart', helper.verifyToken, cartController.addToCart);

    app.delete('/removeBookFromCart', helper.verifyToken, cartController.removeBookFromCart);

    app.get('/carts', helper.verifyToken, cartController.getAllCarts);

    app.put('/placeOrder', helper.verifyToken, cartController.placeOrder);
}