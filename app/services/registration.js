/**
 * @description   : It is work as a middleware between models and controller
 * @file          : registration.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const models = require('../models/registration');

class Service {
  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : register from models
  */
  register = (data, callback) => {
    models.register(data, callback);
  }
}

module.exports = new Service();
