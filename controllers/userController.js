const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res){
        User.find()
        .then((users) =>{
            return res.json(users)
        })
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    // get single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

    // update user by id
      updateUser (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id found' })
                    : res.json({
                        updatedUser: user,
                        message: 'User updated'
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //create new user
    createUser (req, res) {
        User.create(req.body)
            .then((user) => {
                return res.json(user)
            })
            .catch((err) => {
                return res.status(500).json(err)
            });
    },

    //delete user by id
    deleteUser (req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this id found' })
                }
                // Remove a user's thoughts when deleted
                Thought.deleteMany({ _id: { $in: user.thoughts } })
                return res.json({
                    deletedUser: user,
                    message: 'User and associated thoughts deleted'
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //add a new friend 
    addFriend (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id found' })
                    : res.json({
                        updatedUser: user,
                        message: 'Friend added'
                    })
            )
            .catch((err) => {
                return res.status(500).json(err)
            });
    },
    // remove a friend from friend list
    removeFriend (req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id found' })
                    : res.json({
                        updatedUser: user,
                        message: 'Friend removed'
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
};
