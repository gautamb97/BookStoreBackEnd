/**
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password.
 * @package       : mongoose, bcrypt
 * @file          : registration.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registrationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: String, required: true}]
}, {
  timestamps: true, versionKey: false
});
/**
 * @description     : It is converting password content to a encrypted to form using pre middleware
 *                    of mongoose and bcrypt npm package.
 * @middleware      : pre is the middleware of mongoose schema
 * @package         : bcrypt is used to encrpt the password we are getting from client side
*/
registrationSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(this.password, salt);
    this.password = hassedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const RegistrationModel = mongoose.model('Registration', registrationSchema);

class Model {
  /**
   * @description     : It is use to create and save a new note in data base.
   * @param           : data, callback
   * @method          : save to save the coming data in data base
  */
  register = async (data, callback) => {
    const note = new RegistrationModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role
    });
    const user = await RegistrationModel.findOne({ email: data.email });
    if (user) {
      callback('Email already exist');
    } else {
      const registrationData = await note.save();
      callback(null, registrationData);
    }
  }
}

module.exports = new Model();
