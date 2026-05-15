require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/events", require("./routes/events"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/gemini", require("./routes/gemini"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Wait for DB before accepting any requests
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Stop server if DB fails
  });