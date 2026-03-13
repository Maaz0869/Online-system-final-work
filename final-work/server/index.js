const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, regNo, department, password } = req.body;

    // Check if user already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .or(`email.eq.${email},reg_no.eq.${regNo}`)
      .single();

    if (existing) {
      return res
        .status(400)
        .json({ message: "Email or Reg. Number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { error } = await supabase.from("users").insert([
      {
        full_name: fullName,
        email,
        reg_no: regNo,
        department,
        password: hashedPassword,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error. Please try again." });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { email: user.email, fullName: user.full_name, regNo: user.reg_no },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
