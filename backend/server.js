require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const donorRoutes = require("./routes/donorRoutes");
const ngoRoutes = require("./routes/ngoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/ngo", ngoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});