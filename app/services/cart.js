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

  /**
* @description   : It is used to get all carts from bookStore
*                  taking data from controller and sending to models
* @param {data}  : it contains data which we are passing from body
* @param {token} : its has login token and sending to helper to extract id of user
* @returns       : Promise
*/
  getAllCarts = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.getAllCarts(data);
      result.then((cartData) => resolve({ cartData }))
        .catch((err) => reject({ err }));
    });
  }

  /**
* @description   : It is used to get a cart from bookStore
*                  taking data from controller and sending to models
* @param {data}  : it contains data which we are passing from body
* @param {token} : its has login token and sending to helper to extract id of user
* @returns       : Promise
*/
getCart = (data) => {
  return new Promise((resolve, reject) => {
    const result = models.getCart(data);
    result.then((cartData) => resolve({ cartData }))
      .catch((err) => reject({ err }));
  });
}

  /**
   * @description   : It is used to place order from cart taking data
   *                  from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : Promise
  */
   placeOrder = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.placeOrder(data);
      result.then((book) => resolve({ book }))
        .catch((err) => reject({ err }));
    });
  }
}

module.exports = new Service();
