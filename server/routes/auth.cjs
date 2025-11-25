const express = require("express");
const { MongoClient } = require("mongodb");
const saveLoginToDB = require("../saveLoginToDb.cjs");
require("dotenv").config({ path: "../config.env" });

const router = express.Router();

const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db);

// Check if an email exists in Logins collection
router.get("/exists", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "email query param required" });

    const database = client.db("app");
    const loginCollection = database.collection("Logins");
    const user = await loginCollection.findOne({ email });

    return res.json({ exists: !!user, user: user || null });
  } catch (err) {
    console.error("Error checking email existence:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/google", async (req, res) => {
  const { sub, name, email, picture, email_verified } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const result = await saveLoginToDB({
    googleId: sub,
    name,
    email,
    picture,
    email_verified,
    createdAt: new Date()
  });

  return res.json(result);
});

module.exports = router;
