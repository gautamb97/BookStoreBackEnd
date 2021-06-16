/**
 * @description   : It is work as a middleware between models and controller
 * @file          : registration.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const bcrypt = require('bcrypt');
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

  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : login from models
  */
   login = (data, callback) => {
    const { password } = data;
    models.login(data, (error, result) => {
      if (result) {
        bcrypt.compare(password, result.password, (err, resultt) => {
          if (err) {
            callback(err, null);
          }
          if (resultt) {
            callback(null, result);
          } else {
            callback('Password does not match');
          }
        });
      } else {
        callback('user not found');
      }
    });
  }
}

module.exports = new Service();
