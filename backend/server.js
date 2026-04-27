require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const geminiRouter = require("./routes/gemini");

const app = express();

// Connect DB 
connectDB();

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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});