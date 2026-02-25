const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");


// CREATE DONATION
router.post("/", async (req, res) => {
  try {
    const { donorId, foodType, quantity, location } = req.body;

    const newDonation = new Donation({
      donorId,
      foodType,
      quantity,
      location
    });

    await newDonation.save();

    res.json({ message: "Donation created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL DONATIONS
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET DONATIONS FOR NGO DASHBOARD
router.get("/ngo/:ngoId", async (req, res) => {
  try {
    const donations = await Donation.find({
      assignedNgo: req.params.ngoId
    });

    res.json(donations);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ACCEPT DONATION
router.put("/accept/:id", async (req, res) => {
  try {
    const { ngoId } = req.body;

    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = "Accepted";
    donation.assignedNgo = ngoId;

    await donation.save();

    res.json({ message: "Donation accepted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;