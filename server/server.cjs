const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const { MongoClient } = require("mongodb");
const authRoute = require("./routes/auth.cjs");

const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db);
const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");

    app.locals.db = client.db("app");
    app.use("/auth", authRoute);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

startServer();


