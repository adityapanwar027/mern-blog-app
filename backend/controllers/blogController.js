const Blog = require("../models/Blog");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get all blog
const getBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find().populate("author", "name email");

    res.status(200).json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE BLOG 
 const deleteBlog = async (req, res) => 
    { try { await Blog.findByIdAndDelete(req.params.id); 
        res.status(200).json({
        message: "Blog deleted successfully", }); } 
        catch (error) { res.status(500).json({ 
        message: error.message, }); } };


        // UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog
};

