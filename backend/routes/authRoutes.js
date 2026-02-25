const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NGO = require("../models/ngo");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, registrationNumber, contact, address } = req.body;

    const existingNgo = await NGO.findOne({ email });
    if (existingNgo) {
      return res.status(400).json({ message: "NGO already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ngo = new NGO({
      name,
      email,
      password: hashedPassword,
      registrationNumber,
      contact,
      address
    });

    await ngo.save();

    res.json({ message: "NGO Registered Successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: ngo._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      ngoId: ngo._id,
      name: ngo.name
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/* ================= REGISTER ================= */
router.post("/register", authController.register);

/* ================= LOGIN ================= */
router.post("/login", authController.login);

module.exports = router;