const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {
  try {
    const { foodType, quantity, location, expiryDate, ngoId } = req.body;

    const donation = await Donation.create({
      foodType,
      quantity,
      location,
      expiryDate,
      ngoId,
      donorId: req.user?.id // optional if using auth middleware
    });

    res.status(201).json(donation);

  } catch (error) {
    res.status(500).json({ error: "Failed to create donation" });
  }
};
exports.getNgoDonations = async (req, res) => {
  try {
    const { ngoId } = req.params;

    const donations = await Donation.find({ ngoId });

    res.json(donations);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};