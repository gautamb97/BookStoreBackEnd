/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const controller = require('../controller/registration');
const helper = require('../utility/helper');
module.exports = (app) => {

    app.post('/user/registration', helper.setRole('user'), controller.register);

    app.post('/admin/registration', helper.setRole('admin'), controller.register);
}