/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : helper.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
const authSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z][a-z]{3,}$')),

  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z][a-z]{3,}$')),

  email: Joi.string()
    .pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$'))
    .required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9\\#]{8,}')),

  role: Joi.string()
    .required()
});

const setRole = (role) => {
    return (req, res, next) => {
        req.role = role;
        next();
    }
}

/**
 * @description   : creating token using jsonwebtoken module
 * @param {data} as data which comes from the body of postmen
 * @module        : jwt
*/
const generatingToken = (data) => {
    console.log(data);
    const token = jwt.sign({ email: data.email, id: data._id, role: data.role }, process.env.SECRET, { expiresIn: '24h' });
    return token;
  };

module.exports = {
    authSchema,
    setRole,
    generatingToken
}