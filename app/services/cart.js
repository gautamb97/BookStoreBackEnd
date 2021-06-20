const models = require('../models/cart')

class Service {

     /**
   * @description   : It is used to add book to the cart taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : Callback
  */
  addToCart = (data, callback) => {
    models.addToCart(data, callback);
  }
}

module.exports = new Service();
