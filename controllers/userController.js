const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res){
        User.find()
        .then((users) =>{
            return res.json(users)
        });
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // get single user by id

    //create new user

    // update user by id

    //delete user by id

    //add a new friend 

    // remove a friend from friend list

}