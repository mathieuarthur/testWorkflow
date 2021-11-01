var cors = require('cors');
module.exports = function(app) {
 
    app.use(cors());
    var userController = require('../controllers/user.controller.js');
  
    app.post('/api/users', userController.createUser);
    app.get('/api/usersByMail', userController.getUserByMail)
    app.get('/api/users/:id', userController.getUser);
    app.get('/api/users/', userController.getUsers);
    app.put('/api/users/:id', userController.updateUser);
    app.delete('/api/users/:id', userController.deleteUser);
}