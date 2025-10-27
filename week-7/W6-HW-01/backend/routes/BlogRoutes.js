const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  searchBlog
} = require("../controllers/BlogController");

const router = express.Router();

router.get("/search", searchBlog);

// Lấy danh sách tất cả blog
router.get("/", getAllBlogs);

// Tạo blog mới
router.post("/", createBlog);

// Lấy thông tin 1 blog theo ID
router.get("/:id", getBlogById);

// Cập nhật blog theo ID
router.put("/:id", updateBlog);

// Xóa blog theo ID
router.delete("/:id", deleteBlog);



module.exports = router;
