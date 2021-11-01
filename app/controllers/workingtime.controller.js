const Users = require('../models/user.model.js') 
const Workingtime = require('../models/workingtime.model.js')
filename = "workingtime.controller.js"

//---------------------------------- Create workingtime to database --------------------------------------
exports.addWorkingTime = async (req, res) => 
{
    functionName = "addWorkingTime"
    try
    {
        let workingtime = []
        const time = new Workingtime(
        {
            start: req.body.start,
            end: req.body.end
        });

        await Users.find({id: req.params.id})
        .then(user => { workingtime = user[0].workingTime})
        .catch(err => 
        {
            if(err.kind === 'ObjectId') 
            {
                return res.status(404).send(
                {
                    state: false,
                    message: `Error, cannot find the following user with id ${req.body.id}`,
                    error: err
                });                
            }
            return res.status(500).send({
                state: false,
                message: `Error, cannot find the following user with id ${req.body.id}`,
                error: err
            });
        });

        workingtime.push(time)


        await Users.updateOne({id: req.params.id},{ workingTime : workingtime }, {new: true})
        .then(user => 
        {
            if(!user) 
            {
                return res.status(404).send({
                    state: false,
                    message: "Error, the working time was not added !",
                });
            }

            res.status(200).json(
            {
                state: true,
                message: `The working time have been added`
            });

        }).catch(err => 
        {
            return res.status(500).send({
                state: false,
                message: "Error, the user have been not updated !",
                error: err.message
            })
        })
        
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
}




//---------------------------------- get workingtime by user id --------------------------------------

exports.getWorkingTime = (req, res) => 
{
    functionName = "getWorkingTime"
    try
    {
        Users.find({id: req.params.id})
        .then(user => 
        {
            res.status(200).json(
            {
                state: true,
                data: user[0].workingTime
            })
        }).catch(err => 
        {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `the user was not found with the following id '${req.params.id}'`,
                    error: err
                });   
            }
            return res.status(500).send({
                message: `the user was not found with the following id '${req.params.id}'`,
                error: err
            });
        });
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
};
 



//---------------------------------- update user by id --------------------------------------

exports.updateWorkingTime = (req, res) => 
{
    functionName = "updateWorkingTime"
    try
    {
        console.log("test", req.body.workingTime)
        Users.updateOne({id: req.params.id},
        {
            workingTime : req.body.workingTime

        }, {new: true})
        .then(user => 
        {
            if(!user) 
            {
                return res.status(404).send({
                    state: false,
                    message: "Error, the working time have been not updated !",
                    error: `The user with the following id ${req.params.id} was not found`
                });
            }

            res.status(200).json(
            {
                state: true,
                message: `The working time have been updated`
            });

        }).catch(err => 
        {
            return res.status(500).send({
                state: false,
                message: "Error, the working time have been not updated !",
                error: err.message
            })
        })
    }catch(error)
    {
        console.log(`Server status : An error append to this function ${functionName} in the followed file 
        ${filename}.\nServer status : The followed error is ${error}`)
    }
}