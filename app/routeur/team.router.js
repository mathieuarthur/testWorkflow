var cors = require('cors');
module.exports = function(app) {
 
    app.use(cors());
    var teamController = require('../controllers/team.controller.js');

    app.post('/api/teams', teamController.createTeam);
    app.get('/api/teams/:id', teamController.getTeam);
    app.get('/api/teams/', teamController.getTeams);
    app.put('/api/teams/:id', teamController.updateTeam);
    app.delete('/api/teams/:id', teamController.deleteTeam);
}