var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  }));
  app.use(bodyParser.json({limit: "50mb"}));
const mongoose = require('mongoose');
require("dotenv").config();
    

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(async() => { console.log("Successfully connected to MongoDB."); })
.catch(err => 
{
    console.log('Could not connect to MongoDB.')
    console.log(err)
    process.exit()
});

require('./app/routeur/user.router.js')(app)
require('./app/routeur/team.router.js')(app)
require('./app/routeur/workingtime.router.js')(app)
require('./app/routeur/login.router.js')(app)

var server = app.listen(process.env.PORT || 4000, function () { 
var host = server.address().address
var port = server.address().port    

console.log("App listening at http://%s:%s", host, port) 
})

module.exports = server;