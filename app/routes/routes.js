/**
 * @description   : It is use to route the APIs
 * @file          : routes.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const controller = require('../controller/registration');
const helper = require('../utility/helper');
module.exports = (app) => {

    app.post('/userRegistration', helper.setRole('user'), controller.register);

    app.post('/adminRegistration', helper.setRole('admin'), controller.register);

    app.post('/login', controller.login);
}