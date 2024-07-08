const router = require("express").Router();

const {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
  createThought,
  updateThought,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// /api/users/:userId/thoughts
router.route("/:userId/thoughts").post(createThought);

// /api/users/:userId/thoughts/thoughtId
router.route("/:userId/thoughts/:thoughtId").put(updateThought);

module.exports = router;
