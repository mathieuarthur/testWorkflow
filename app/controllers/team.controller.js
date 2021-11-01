const Team = require('../models/team.model.js');
const Users = require('../models/user.model.js')
const bcrypt = require('bcrypt');
filename = "team.controller.js"

//---------------------------------- Create team to database --------------------------------------
exports.createTeam = async (req, res) => 
{
    functionName = "createTeam"
    try
    {
        let state = []
        let userState = {}
        let globalState = false

        const team = new Team(
        {
            name: req.body.name,
            member: req.body.member,
            supervisor: req.body.supervisor,
            workingTime: req.body.workingTime
        });
    
        console.log("team member", team.member)
        for(const member in team.member)
        {
            await Users.find({id: member})
            .then(user => { state.push({user : member, state: true}) })
            .catch(err => { state.push({user : member, state: false}) })
        }
        
        for(const [key,value] of Object.entries(state))
        {
            value.state == true
            ? globalState = true
            : (
                globalState = false,
                userState.user = value.user
            )
        }

        globalState == true ?(
            await team.save().then(data => 
            {
                res.status(200).json(
                {
                    state: true,
                    message: `the following team ${req.body.name} have been created !`,
                    data : data
                })
            }).catch(err => 
            {
                res.status(500).json(
                {
                    state: false,
                    message: `Error, the following team ${req.body.team} was not created`,
                    error: err.message
                })
            })
        ):(
            res.status(400).json(
            {
                state: false,
                message: `Error, the following team ${req.body.name} was not created because the user with id ${userState.user} do not exist`,
            })
        )
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
}




//---------------------------------- get all team --------------------------------------


exports.getTeams = (req, res) => 
{
    functionName= "getTeams"
    try
    {
        Team.find().select('-__v').then(data => 
        {
            res.status(200).json(
            {
                state: true,
                data: data
            });
        }).catch(error => 
        {
            res.status(500).json(
            {
                message: "Error, cannot get the teams",
                error: error
            });
        });
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
        
};


//---------------------------------- get team by id --------------------------------------

exports.getTeam = (req, res) => 
{
    functionName = "getTeam"
    try
    {
        Team.find({teamId: req.params.id})
        .then(team => 
        {
            res.status(200).json(
                {
                    state: true,
                    data: team[0]
                });
        }).catch(err => 
        {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "team not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving team with id " + req.params.id,
                error: err
            });
        });
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
};
 

//---------------------------------- update team by id --------------------------------------

exports.updateTeam = (req, res) => 
{
    functionName = "updateTeam"
    try
    {
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
}



//---------------------------------- delete team by id --------------------------------------

exports.deleteTeam = (req, res) => 
{
    functionName = "deleteTeam"
    try
    {
        let teamId = req.params.id

        Team.remove({teamId:teamId})
        .then(team => {
            if(!team) 
            {
                res.status(404).json({
                state: false,
                message: `Error, the team with the following id ${teamId} do not exist`
                })
            }
            res.status(200).json({
                state: true,
                message: `the team with the following id ${teamId} have been deleted`
            })
        }).catch(err => {
            return res.status(500).send({
                message: `Error, cannot delete the team with the following id ${teamId}`,
                error: err.message
            })
        })
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
}