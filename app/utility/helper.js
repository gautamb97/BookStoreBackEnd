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
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const redis = require('redis');
const models = require('../models/registration')

const client = redis.createClient();
const logger = require('../logger/logger');

class Helper {
  /**
   * @description   : validating all parameters we are getting from the user for registration
   * @method        : string, min, required, pattern of JOI
  */
  authSchema = Joi.object({
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

  setRole = (role) => {
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
  generatingToken = (data) => {
    const token = jwt.sign({ email: data.email, id: data._id, role: data.role }, process.env.SECRET, { expiresIn: '24d' });
    client.setex('token', 7200, token);
    return token;
  };

  /**
 * @description   : veryfying token using jsonwebtoken module
 * @param {data}  : it contains the token which we want to verify and then sending to controller
 * @module        : jwt
*/
  verifyToken = (req, res, next) => {
    try {
      const tokenVerification = jwt.verify(req.headers.token, process.env.SECRET);
      client.get('token', (err, result) => {
        if (err) throw err;
        if (req.headers.token === result) {
          req.userData = tokenVerification;
          const userId = tokenVerification.id;
          req.userId = userId;
        }
        next();
      });
    } catch (err) {
      res.status(401).send({
        err: 'Unauthorized user',
      });
    }
  };

   /**
 * @description   : veryfying token using jsonwebtoken module
 * @param {data}  : it contains the token which we want to verify and then sending to controller
 * @module        : jwt
*/
verifyRole = (req, res, next) => {
  try {
    const tokenVerification = jwt.verify(req.headers.token, process.env.SECRET);
    client.get('role', (err, result) => {
      if (err) throw err;
      if (tokenVerification.role === 'admin' && result === 'admin') {
        req.userData = tokenVerification;
        const userId = tokenVerification.id;
        req.userId = userId;
      }
      else {
          res.status(401).send({
            err: 'Authentication failed',
          });
        }
      next();
    });
  } catch (err) {
    res.status(401).send({
      err: 'Unauthorized user',
    });
  }
};

checkRole = (role) => {
  return (req, res, next) => {
    const loginData = {
      email: req.body.email,
      password: req.body.password
    }
    models.login(loginData, (error, data) => {
      if(role === data.role) {
        client.setex('role', 7200, role);
        next();
        }
        else {
          res.status(400).send({
            err: 'Authentication failed',
          });
        }
    })
  }
}


  /**
 * @description   : sending an email through nodemailer
 * @module        : nodemailer, ejs
 * @file          : helper.js
*/
  sendingEmail = (data) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    ejs.renderFile('app/view/sendEmail.ejs', (error, result) => {
      if (error) {
        logger.log('error', error);
      } else {
        const message = {
          from: process.env.EMAIL,
          to: data.email,
          subject: 'Re: Reset your password',
          html: `${result}<button><a href="${'http://localhost:4200/resetPassword/'}${this.generatingToken(data)}">Click here</a></button>`,

        };

        transporter.sendMail(message, (err, info) => {
          const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info);
          return sendEmailInfo;
        });
      }
    });
  };

}

module.exports = new Helper();
