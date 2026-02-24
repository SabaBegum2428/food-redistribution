

// CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const data = req.body;

    data.status = "pending";
    data.createdAt = new Date();

    const doc = await db.collection("donations").add(data);

    res.json({ message: "Donation created", id: doc.id });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// DONATION HISTORY
exports.getDonationHistory = async (req, res) => {
  try {
    const donorId = req.params.donorId;

    const snapshot = await db
      .collection("donations")
      .where("donorId", "==", donorId)
      .get();

    let list = [];
    snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

    res.json(list);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ACTIVE PICKUP
exports.getActivePickup = async (req, res) => {
  try {
    const donorId = req.params.donorId;

    const snapshot = await db
      .collection("donations")
      .where("donorId", "==", donorId)
      .where("status", "in", ["accepted", "assigned", "picked"])
      .get();

    let list = [];
    snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

    res.json(list);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// IMPACT SCORE
exports.getImpact = async (req, res) => {
  try {
    const donorId = req.params.donorId;

    const snapshot = await db
      .collection("donations")
      .where("donorId", "==", donorId)
      .where("status", "==", "delivered")
      .get();

    let count = snapshot.size;

    res.json({ totalDeliveries: count, impactScore: count * 10 });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
