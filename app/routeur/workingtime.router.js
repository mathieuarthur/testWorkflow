var cors = require('cors');
module.exports = function(app) {
 
    app.use(cors());
    var workingController = require('../controllers/workingtime.controller.js');

    app.post('/api/time/:id', workingController.addWorkingTime);
    app.get('/api/time/:id', workingController.getWorkingTime);
    app.put('/api/time/:id', workingController.updateWorkingTime);
}