const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Play4Glory Backend Running");
});

// PORT
const PORT = process.env.PORT || 5000;

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});