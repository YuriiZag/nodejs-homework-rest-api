const mongoose = require("mongoose");

async function connectMongo() {
  try {
    await mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://Zahrai:13997112@db-contacts.twtsyyl.mongodb.net/db-contacts?retryWrites=true&w=majority"
    );

  } catch (error) {
    console.error(`mongoDB error: ${error.message}`);
    return process.exit(1)
  }
  console.log("connected to mongoDB");
}

module.exports = { connectMongo };
