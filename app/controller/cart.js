const services = require('../services/cart')

class CartController {

    /**
       * @description : It is adding label to an an existing note in fundooNotes
       * @param {httprequest} req
       * @param {httpresponse} res
       * @method       : addLabelToNote from service.js
      */
    addToCart = (req, res) => {
        try {
            const data = {
                bookId: req.body.bookId,
                userId: req.userId
            };
            services.addToCart(data, (err, result) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'book was unable to add in cart',
                        err,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'book is added to cart successfully',
                    data: result
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
