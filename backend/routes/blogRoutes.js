const express = require("express");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getBlogs);
router.delete("/:id", protect, deleteBlog);
router.put("/:id", protect, updateBlog);

module.exports = router;