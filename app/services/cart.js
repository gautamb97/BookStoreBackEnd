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

  /**
   * @description   : It is used to remove book from cart taking data
   *                  from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : Promise
  */
   removeBookFromCart = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.removeBookFromCart(data);
      result.then((book) => resolve({ book }))
        .catch((err) => reject({ err }));
    });
  }
}

module.exports = new Service();
