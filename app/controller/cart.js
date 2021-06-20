const services = require('../services/cart')

class CartController {

    /**
       * @description : It is adding book to cart in bookstore
       * @param {httprequest} req
       * @param {httpresponse} res
       * @method       : addToCart from service.js
      */
    addToCart = (req, res) => {
        try {
            const data = {
                bookId: req.body.bookId,
                userId: req.userId
            };
            services.addToCart(data, (err) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'book was unable to add in cart',
                        err,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'book is added to cart successfully'
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
   * @description : It is remove book from cart
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : removeFromCart from service.js
  */
  removeBookFromCart = (req, res) => {
    try {
      const data = {
        bookId: req.body.bookId,
        userId: req.userId
      };
      services.removeBookFromCart(data).then(() => {
        res.status(200).send({
          success: true,
          message: 'book removed from cart successfully',
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'book was unable to remove from cart',
          err,
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

module.exports = new CartController();
