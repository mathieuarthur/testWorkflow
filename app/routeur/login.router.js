var cors = require('cors');
module.exports = function(app) {
 
    app.use(cors());
    var loginController = require('../controllers/login.controller.js');

    app.post('/api/login', loginController.getLogin);
    app.get('/api/isAuth', loginController.isAuth);
}