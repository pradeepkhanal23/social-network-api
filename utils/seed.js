const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => {
  console.error("MongoDB connection error: ", err.message);
});

connection.once("open", async () => {
  console.log("MongoDB connected successfully");

  try {
    //delete collection if they exists
    await User.deleteMany({});
    await Thought.deleteMany({});

    //inserting the dummy datas once the collection is cleared
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    //console logging the data nicely in a table format
    console.table(users);
    console.table(thoughts);
    console.info("Seeding complete! 🌱");
  } catch (error) {
    console.error("Error seeding database:", err.message);
  } finally {
    process.exit(0);
  }
});
