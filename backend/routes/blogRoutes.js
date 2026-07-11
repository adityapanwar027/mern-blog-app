const express = require("express");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", protect, upload.single("image"), createBlog);

router.get("/", getBlogs);
router.delete("/:id", protect, deleteBlog);
router.put("/:id", protect, updateBlog);

module.exports = router;