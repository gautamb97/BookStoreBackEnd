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

  /**
   * @description : It is getting all existing carts from bookStore
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getAllCarts from service.js
  */
   getAllCarts = (req, res) => {
    try {
      services.getAllCarts(req).then((carts) => {
        res.status(200).send({
          success: true,
          message: 'fetched all carts successfully',
          carts,
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to fetch labels',
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


  /**
   * @description : It is getting a existing cart from bookStore
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getCart from service.js
  */
   getCart = (req, res) => {
    try {
      const data = {
        userId: req.params.userId
      }
      services.getCart(data).then((carts) => {
        res.status(200).send({
          success: true,
          message: 'fetched cart successfully',
          carts,
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to fetch cart',
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
  /**
   * @description : It is remove book from cart
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : removeFromCart from service.js
  */
   placeOrder = (req, res) => {
    try {
      const data = {
        cartId: req.params.cartId,
        userId: req.userId
      };
      services.placeOrder(data).then(() => {
        res.status(200).send({
          success: true,
          message: 'order placed successfully',
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to place order',
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
