const express = require("express");
const {createBlog, getBlog, getBlogs, updateBlog, deleteBlog, toggleLike, addComment} = require("../controllers/blogController.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const upload = require('../middleware/uploadMiddleware.js');

const router = express.Router();

router.post("/", authMiddleware, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);
router.post("/:id/like", authMiddleware, toggleLike);
router.post("/:id/comment", authMiddleware, addComment);
router.post("/:id/image", authMiddleware, upload.single('image'), (req,res)=>{
    res.json({ image: `/uploads/${req.file.filename}` });
});

module.exports = router