const express = require("express");
const multer = require("multer");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const router = express.Router();

const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db);

// Multer storage config for logo
const storage = multer.diskStorage({
  destination: "uploads/logos",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Check if an organization exists for a given email
router.get("/exists", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "email query param required" });

    const database = client.db("app");
    const orgCollection = database.collection("Organizations");
    const org = await orgCollection.findOne({ email });

    return res.json({ exists: !!org, org: org || null });
  } catch (err) {
    console.error("Error checking org existence:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/register", upload.single("logo"), async (req, res) => {
  try {
    console.log(`POST /org/register received at ${new Date().toISOString()} from ${req.ip}`);
    if (req.file) console.log(`  uploaded file: ${req.file.originalname} -> ${req.file.filename}`);
    const database = client.db("app");
    const loginCollection = database.collection("Logins");
    const orgCollection = database.collection("Organizations");

    const {
      email, // should be sent from frontend with other form fields
      name,
      address,
      mobile,
      adminName,
      website,
      orgType,
      social
    } = req.body;

    // 1️⃣ Check if user email exists in Logins
    const userExists = await loginCollection.findOne({ email });

    if (!userExists) {
      return res.status(403).json({
        success: false,
        message: "User not authenticated or not found in Logins collection.",
      });
    }

    // 2️⃣ Prevent duplicate org registration by the same email
    const existingOrg = await orgCollection.findOne({ email });
    if (existingOrg) {
      return res.json({
        success: false,
        message: "Organization already registered under this email.",
      });
    }

    // 3️⃣ Prepare final data object
    const newOrg = {
      email, // link org to user
      name,
      address,
      mobile,
      adminName,
      website: website || null,
      orgType,
      social: JSON.parse(social),
      logo: req.file?.filename || null,
      access: false,
      createdAt: new Date(),
    };

    // 4️⃣ Insert into Organizations collection
    const result = await orgCollection.insertOne(newOrg);

    return res.json({
      success: true,
      message: "Organization registered successfully!",
      insertedId: result.insertedId,
      data: newOrg,
    });

  } catch (error) {
    console.log("Error registering organization:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
