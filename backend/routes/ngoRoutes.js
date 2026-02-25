const express = require("express");
const Donation = require("../models/Donation");

const router = express.Router();

// NGO Accept Donation
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