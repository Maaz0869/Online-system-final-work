const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
// Require the user model (file name is lowercase 'user.js')
const User = require("./models/user"); // Jo model humne banaya tha
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // JSON data parse karne ke liye
app.use(cors()); // Frontend aur Backend ke darmiyan connection allow karne ke liye

// 1. MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fyp";
let dbConnected = false;
mongoose
  .connect(process.env.MONGO_URI || mongoUri)
  .then(() => {
    dbConnected = true;
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    dbConnected = false;
    console.log("❌ Connection Error Details:");
    console.error(err.message); // Yeh line aapko batayegi ke "Invalid password" hai ya "IP blocked"
    // Also log full error for debugging (optional)
    console.debug(err);
  });

// Health endpoint to report server and DB connection status
app.get("/health", (req, res) => {
  res.json({ ok: true, dbConnected });
});

// 2. Signup Route
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, regNo, department, password } = req.body;

    // Choose data layer: real DB when connected; otherwise use mockDb.
    const usingMock = !dbConnected;
    if (usingMock)
      console.warn(
        "⚠️  MongoDB not connected — using in-memory mock DB for register route.",
      );

    // Check if student already exists
    const userExists = usingMock
      ? await require("./mockDb").findOne({ $or: [{ email }, { regNo }] })
      : await User.findOne({ $or: [{ email }, { regNo }] });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email or Reg. Number already registered" });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save student to database or mock
    if (usingMock) {
      await require("./mockDb").create({
        fullName,
        email,
        regNo,
        department,
        password: hashedPassword,
      });
    } else {
      const newStudent = new User({
        fullName,
        email,
        regNo,
        department,
        password: hashedPassword,
      });
      await newStudent.save();
    }

    res
      .status(201)
      .json({ message: "Student registered successfully!", usingMock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error. Please try again." });
  }
});

// 2b. Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usingMock = !dbConnected;

    // find user
    const user = usingMock
      ? await require("./mockDb").findOne({ email })
      : await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // compare passwords (user.password is hashed)
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    // success - in real app return a token; here return basic info
    const safeUser = {
      email: user.email,
      fullName: user.fullName,
      regNo: user.regNo,
    };
    res.json({ message: "Login successful", user: safeUser, usingMock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 3. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
