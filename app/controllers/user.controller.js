const Users = require('../models/user.model.js');
const bcrypt = require('bcrypt');
filename = "user.controller.js"

//---------------------------------- Create user to database --------------------------------------
exports.createUser = (req, res) => 
{
    functionName = "createUser"
    try
    {
        bcrypt.genSalt(10, function(err, salt) 
        {
            bcrypt.hash(req.body.password, salt, function(err, hash) 
            {
                const user = new Users(
                {
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    role: req.body.role
                });
            
                user.save().then(data => 
                {
                    res.status(200).json(
                    {
                        state: true,
                        message: `the user : ${req.body.user} have been created !`,
                        data : data
                    })
                }).catch(err => 
                {
                    res.status(500).json(
                    {
                        state: false,
                        message: `Error, the following user ${req.body.user} was not created`,
                        error: err.message
                    })
                })
            })
        })
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
}




//---------------------------------- get all users --------------------------------------


exports.getUsers = (req, res) => 
{
    functionName= "getUsers"
    try
    {
        Users.find().select('-__v').then(data => 
        {
            res.status(200).json(data);
        }).catch(error => {
            console.log(error);
            res.status(500).json(
            {
                message: "Error!",
                error: error
            });
        });
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
        
};


//---------------------------------- get users by id --------------------------------------

exports.getUser = (req, res) => 
{
    functionName = "getUser"
    try
    {
        Users.find({id: req.params.id})
        .then(user => 
        {
            if(user.length == 0)
            {
                return res.status(404).send({
                    message: `The user was not found with the following id : ${req.params.id}`
                });    
            }

            res.status(200).json(
            {
                state: true,
                data: user[0]
            });

        }).catch(err => 
        {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `The user was not found with the following id : ${req.params.id}`,
                    error: err
                });                
            }
            return res.status(500).send({
                message: `The user was not found with the following id : ${req.params.id}`,
                error: err
            });
        });
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
};
 



//---------------------------------- get users by mail --------------------------------------

exports.getUserByMail = (req, res) => 
{
    functionName = "getUserByMail"
    try
    {
        console.log("email", req.query.email)
        
        Users.find({email: req.query.email})
        .then(user => 
        {
            if(user.length == 0)
            {
                return res.status(404).send({
                    message: `The user was not found with the following email : ${req.query.email}`
                });    
            }

            res.status(200).json(
            {
                state: true,
                data : user[0]
            });
        }).catch(err => 
        {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `The user was not found with the following email : ${req.query.email}`,
                    error: err
                });                
            }
            return res.status(500).send({
                message: `The user was not found with the following email : ${req.query.email}`,
                error: err
            });
        });
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
};
 



//---------------------------------- update user by id --------------------------------------

exports.updateUser = (req, res) => 
{
    functionName = "updateUser"
    try
    {
        bcrypt.genSalt(10, function(err, salt) 
        {
            bcrypt.hash(req.body.password, salt, function(err, hash) 
            {
                Users.updateOne({id: req.params.id},
                {
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    role: req.body.role,
                    workingTime : req.body.workingTime

                }, {new: true})
                .then(user => 
                {
                    if(!user) 
                    {
                        return res.status(404).send({
                            state: false,
                            message: "Error, the user have been not updated !",
                            error: `The user with the following id ${req.params.id} was not found`
                        });
                    }

                    res.status(200).json(
                    {
                        state: true,
                        message: `The user ${req.body.user} have been updated`
                    });

                }).catch(err => 
                {
                    return res.status(500).send({
                        state: false,
                        message: "Error, the user have been not updated !",
                        error: err.message
                    })
                })
            })
        })
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
}



//---------------------------------- delete user by id --------------------------------------

exports.deleteUser = (req, res) => 
{
    functionName = "deleteUser"
    try
    {
        let userId = req.params.id

        Users.remove({id:userId})
        .then(user => {
            if(!user) 
            {
                res.status(404).json({
                state: false,
                message: `Error, the user with the following id ${userId} do not exist`
                })
            }
            res.status(200).json({
                state: true,
                message: `the user with the following id ${userId} have been deleted`
            })
        }).catch(err => {
            return res.status(500).send({
                message: `Error, cannot delete the user with the following id ${userId}`,
                error: err.message
            })
        })
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${this.functionName} in the followed file 
        ${this.filename}.\nServer status : The followed error is ${error}`)
    }
}