/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : bookValidation.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const Joi = require('joi');

class BookHelper {
  /**
   * @description   : validating all parameters we are getting from the user for registration
   * @method        : string, min, required, pattern of JOI
  */
  bookPropertyValidation = Joi.object({
    author: Joi.string()
      .min(3)
      .required()
      .pattern(new RegExp('^[A-Za-z ]{3,}$')),

    title: Joi.string()
      .min(3)
      .required(),

    image: Joi.string()
      .required(),

    quantity: Joi.number()
      .required(),

    price: Joi.number()
      .required(),

    description: Joi.string()
        .required()
  });

  updateBookProperty = Joi.object({
    author: Joi.string()
      .min(3)
      .required()
      .pattern(new RegExp('^[A-Za-z ]{3,}$')),

    title: Joi.string()
      .min(3)
      .required(),

    image: Joi.string()
      .required(),

    quantity: Joi.number()
      .required(),

    price: Joi.number()
      .required(),

    description: Joi.string()
        .required(),
    
    bookId: Joi.string()
        .required(),
  });
}

module.exports = new BookHelper();
