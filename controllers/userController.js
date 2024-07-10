const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      //when we fetch all the users, we just want to show the ids of thoughts and friends
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      //when we fetch a single user, then we want to display all the associated properties nested into it
      const user = await User.findOne({ _id: req.params.userId })
        .populate({
          path: "thoughts",
        })
        .populate({
          path: "friends",
        });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const userId = req.params.userId;
      const { thoughtText } = req.body;

      //getting the associated user by ID
      const associatedUser = await User.findById(userId);

      if (!associatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      //npw creating the thought with the associated user's username to prevent username mismatch
      const thought = await Thought.create({
        thoughtText,
        username: associatedUser.username,
      });

      // adding the thought ID to the user's thought array
      await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      ).populate("thoughts");

      res.json("Thought Created 🎉");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      // deconstructing the userId and thoughtId from request parameters
      const { thoughtId } = req.params;

      //finding and updating the thought
      const updatedThought = await Thought.findOneAndUpdate(
        {
          _id: thoughtId,
        },
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      //checking if the thought was found and updated
      if (!updatedThought) {
        return res.status(404).json({
          message: "No thought with that ID",
        });
      }

      //responsing with the updated thought
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend to a user
  async addFriend(req, res) {
    try {
      const friendId = req.params.friendId;

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({ message: "Friend added successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // remove a friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({ message: "Friend removed successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
