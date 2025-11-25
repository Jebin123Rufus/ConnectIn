const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db);

async function saveLoginToDB(userData) {
  try {
    const database = client.db("app");
    const loginsCollection = database.collection("Logins");

    const existingUser = await loginsCollection.findOne({ email: userData.email });

    if (existingUser) {
      console.log(`User with email ${userData.email} already exists.`);
      return { status: "exists", email: existingUser.email, user: existingUser };
    }

    const result = await loginsCollection.insertOne(userData);
    return { status: "inserted", email: userData.email, userId: result.insertedId };

  } catch (err) {
    console.error("Error saving login:", err);
    return { status: "error", error: err };
  }
}

module.exports = saveLoginToDB;


