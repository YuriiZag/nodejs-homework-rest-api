const mongoose = require("mongoose");


async function connectMongo() {
  try {
    await mongoose.set("strictQuery", true);

    await mongoose.connect(
      
      process.env.DB_URI

    );

  } catch (error) {
    console.error(`mongoDB error: ${error.message}`);
    return process.exit(1)
  }
  console.log("connected to mongoDB");
}

module.exports = { connectMongo };
