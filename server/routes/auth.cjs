const express = require("express");
const saveLoginToDB = require("../saveLoginToDb.cjs");

const router = express.Router();

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
