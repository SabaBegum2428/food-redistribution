


/* =====================================================
   📦 1️⃣ GET ASSIGNED PICKUPS FOR VOLUNTEER
===================================================== */

exports.getAssignedPickups = async (req, res) => {

  try {

    const snapshot = await db
      .collection("donations")
      .where("status", "==", "assigned")
      .get();

    let list = [];

    snapshot.forEach(doc => {
      list.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(list);

  } catch (err) {
    console.error("Fetch pickups error:", err);
    res.status(500).json(err.message);
  }
};



/* =====================================================
   ✅ 2️⃣ VOLUNTEER ACCEPTS PICKUP
===================================================== */

exports.acceptPickup = async (req, res) => {

  try {

    const { donationId } = req.body;

    if (!donationId) {
      return res
        .status(400)
        .json({ error: "Donation ID required" });
    }

    await db.collection("donations")
      .doc(donationId)
      .update({
        status: "picked",
        pickedAt: new Date()
      });

    res.json({
      message: "Pickup accepted by volunteer"
    });

  } catch (err) {
    console.error("Accept pickup error:", err);
    res.status(500).json(err.message);
  }
};



/* =====================================================
   📍 3️⃣ UPDATE LIVE TRACKING
===================================================== */

exports.updateTracking = async (req, res) => {

  try {

    const {
      donationId,
      location,
      status
    } = req.body;

    if (!donationId) {
      return res
        .status(400)
        .json({ error: "Donation ID required" });
    }

    await db.collection("donations")
      .doc(donationId)
      .update({
        location,
        status,
        updatedAt: new Date()
      });

    res.json({
      message: "Tracking updated successfully"
    });

  } catch (err) {
    console.error("Tracking error:", err);
    res.status(500).json(err.message);
  }
};
