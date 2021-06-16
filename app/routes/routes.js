/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const controller = require('../controller/registration');
module.exports = (app) => {

    app.post('/user/registration', controller.register);

    app.post('/admin/registration', controller.register);
}