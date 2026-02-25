const express = require("express");
const Donation = require("../models/Donation");

const router = express.Router();

// Get Donation History
router.get("/history/:id", async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.params.id });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Donor Stats
router.get("/stats/:id", async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.params.id });

    const total = donations.length;

    const meals = donations.reduce((sum, d) => {
      return sum + parseInt(d.quantity || 0);
    }, 0);

    const active = donations.filter(d => d.status === "Pending").length;

    res.json({
      total,
      meals,
      active
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;