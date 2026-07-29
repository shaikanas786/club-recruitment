const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

// ======================
// Connect MongoDB
// ======================

connectDB();

// ======================
// Middleware
// ======================

app.use(cors());
app.use(express.json());

// ======================
// Debug All Requests
// ======================

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// ======================
// Static Files
// ======================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ======================
// Test Route
// ======================

app.get("/", (req, res) => {
  res.send("Club Recruitment Backend is Running");
});

// ======================
// Routes
// ======================

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

const clubRoutes = require("./routes/clubRoutes");
app.use("/api/clubs", clubRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

// ======================
// 404 Handler
// ======================

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// ======================
// Global Error Handler
// ======================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});