/*const { db } = require("../config/firebaseAdmin");



exports.getAvailablePickups = async (req, res) => {

  try {

    const snapshot = await db
      .collection("donations")
      .where("status", "in", ["accepted", "assigned"])
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



/* ✅ ACCEPT PICKUP 
exports.acceptPickup = async (req, res) => {

  try {

    const { donationId } = req.body;

    await db.collection("donations")
      .doc(donationId)
      .update({
        status: "picked"
      });

    res.json({
      message: "Pickup accepted"
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};



/* 📍 UPDATE TRACKING 
exports.updateTracking = async (req, res) => {

  try {

    const { donationId, location, status } = req.body;

    await db.collection("donations")
      .doc(donationId)
      .update({
        location,
        status
      });

    res.json({
      message: "Tracking updated"
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};*/



/* 📦 GET AVAILABLE DONATIONS */
exports.getAvailablePickups = async (req, res) => {

  try {

    const snapshot = await db
      .collection("donations")
      .where("status", "in", ["accepted", "assigned"])
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
    console.error(err);
    res.status(500).json(err.message);
  }
};


/* ✅ ACCEPT PICKUP */
exports.acceptPickup = async (req, res) => {

  try {

    const { donationId } = req.body;

    await db.collection("donations")
      .doc(donationId)
      .update({
        status: "accepted"
      });

    res.json({
      message: "Donation accepted by NGO"
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};


/* 👤 ASSIGN VOLUNTEER */
exports.updateTracking = async (req, res) => {

  try {

    const {
      donationId,
      volunteerId,
      status,
      location
    } = req.body;

    await db.collection("donations")
      .doc(donationId)
      .update({
        volunteerId,
        status,
        location
      });

    res.json({
      message: "Volunteer assigned & tracking updated"
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};
