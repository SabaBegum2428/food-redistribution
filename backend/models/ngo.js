const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("NGO", ngoSchema);