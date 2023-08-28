const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// get one, put and delete /api/users/:id 
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// add/delete friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

//get all /api/users
router.route("/").get(getAllUsers).post(createUser);

module.exports = router;