const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");
connectDB();//database connection

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to CareerForge AI Backend 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});