const connection = require("../config/connection");
const { User } = require("../models");
const { users } = require("./data");

connection.on("error", (err) => {
  console.error("MongoDB connection error: ", err.message);
});

connection.once("open", async () => {
  console.log("MongoDB connected successfully");

  try {
    //delete collection if they exists
    await User.deleteMany({});

    //inserting the dummy datas once the collection is cleared
    await User.insertMany(users);

    //console logging the data nicely in a table format
    console.table(users);
    console.info("Seeding complete! 🌱");
  } catch (error) {
    console.error("Error seeding database:", err.message);
  } finally {
    process.exit(0);
  }
});
