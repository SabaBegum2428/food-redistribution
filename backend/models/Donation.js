const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  foodType: String,
  quantity: String,
  location: String,

  status: {
    type: String,
    default: "Pending"
  },

  assignedNgo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NGO",
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);