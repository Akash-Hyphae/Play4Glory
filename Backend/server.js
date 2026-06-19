const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const walletRoutes = require("./routes/walletRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const teamRegistrationRoutes = require("./routes/teamRegistrationRoutes");
const pointsTableRoutes = require("./routes/pointsTableRoutes");
const mvpRoutes = require("./routes/mvpRoutes");
const roomRoutes = require("./routes/roomRoutes");
const tdmMatchRoutes = require("./routes/tdmMatchRoutes");
const withdrawRoutes = require("./routes/withdrawRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/registrations", teamRegistrationRoutes);
app.use("/api/points-table", pointsTableRoutes);
app.use("/api/mvp", mvpRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/tdm-matches", tdmMatchRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/payment", paymentRoutes);

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
