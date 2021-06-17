/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const services = require('../services/registration');
const helper = require('../utility/helper');

/**
 * @description    : This class has two methods to create and login of user
 * @methods        : create, login
*/

class Controller {
  /**
   * @description   : register an user or admin in bookStore
   * @param         : httpRequest and httpResponse
   * @method        : validate it compares the authSchema properties and the data coming
   *                  from the object and using services file method
  */
  register = (req, res) => {
    try {
      const registrationDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.role
      };
      const validationResult = helper.authSchema.validate(registrationDetails);
      if (validationResult.error) {
        res.status(400).send({
          success: false,
          message: 'Pass the proper format of all the fields',
          data: validationResult,
        });
        return;
      }
      services.register(registrationDetails, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: error,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'registered successfully',
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
   * @description   : login to bookstore
   * @param         : httpRequest and httpResponse
   * @method        : services file method for login having an object and callback
  */
   login = (req, res) => {
    try {
      const loginCredentials = {
        email: req.body.email,
        password: req.body.password,
      };
      services.login(loginCredentials, (error, data) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'login failed',
            error,
          });
        }
        return res.status(200).send({
          success: true,
          message: 'logged in successfully',
          token: helper.generatingToken(data),
        });
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

module.exports = new Controller();