const express = require("express");
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");
const cors = require("cors");
const BlogModel = require("./models/Blog"); // import model Blog của bạn


//middleware
app.use(express.json());
// Đọc JSON và form-urlencoded body
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173", // cho phép FE truy cập
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");

    // --- SEED DATA ---
    const count = await BlogModel.countDocuments();
    if (count < 1) {
      console.log("🪴 No blogs found. Seeding sample data...");

      const sampleBlogs = [
        {
          title: "Shark Bình và startup triệu đô",
          body: "Shark Bình chia sẻ bí quyết đầu tư khởi nghiệp.",
          image: "https://example.com/blog1.jpg",
        },
        {
          title: "Khởi nghiệp 4.0",
          body: "Công nghệ thay đổi cuộc sống và tư duy kinh doanh hiện đại.",
          image: "https://example.com/blog2.jpg",
        },
        {
          title: "Kinh nghiệm gọi vốn thành công",
          body: "Các bước cần chuẩn bị khi trình bày dự án với nhà đầu tư.",
          image: "https://example.com/blog3.jpg",
        },
      ];

      await BlogModel.insertMany(sampleBlogs);
      console.log("🌱 Seeded sample blogs successfully!");
    } else {
      console.log(`✅ Found ${count} existing blogs. Skipping seeding.`);
    }
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
