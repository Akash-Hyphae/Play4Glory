const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Config/db");
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

// Database Connection
connectDB();

// CORS Configuration to accept both local ports and production origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://play4glory-h5e2.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback to allow any origin in development
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
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

// Base Health Check Route
app.get("/", (req, res) => {
  res.send("Play4Glory Backend Running");
});

// Port & Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});