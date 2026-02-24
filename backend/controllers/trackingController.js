

// Update latest location + optional history
exports.updateLocation = async (req, res) => {
  const { donationId, lat, lng } = req.body;

  if (!donationId || lat === undefined || lng === undefined) {
    return res.status(400).json({ message: "donationId, lat, lng are required" });
  }

  try {
    // Save latest location
    await db.collection("tracking").doc(donationId).set({
      lat,
      lng,
      updatedAt: new Date()
    });

    // Optional: keep history of movements
    await db.collection("tracking")
      .doc(donationId)
      .collection("history")
      .add({
        lat,
        lng,
        timestamp: new Date()
      });

    res.json({ message: "Location updated successfully" });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).json({ message: "Failed to update location" });
  }
};

// Get latest location
exports.getLocation = async (req, res) => {
  const donationId = req.params.id;

  try {
    const doc = await db.collection("tracking").doc(donationId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "No location found" });
    }

    res.json(doc.data());
  } catch (err) {
    console.error("Error fetching location:", err);
    res.status(500).json({ message: "Failed to fetch location" });
  }
};

// Get full location history
exports.getHistory = async (req, res) => {
  const donationId = req.params.id;

  try {
    const snapshot = await db.collection("tracking")
      .doc(donationId)
      .collection("history")
      .orderBy("timestamp", "asc")
      .get();

    const history = snapshot.docs.map(doc => doc.data());
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
