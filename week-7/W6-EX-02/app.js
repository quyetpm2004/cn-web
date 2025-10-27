const express = require("express");
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");


//middleware
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectDB()

app.use("/api/blogs", blogRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
