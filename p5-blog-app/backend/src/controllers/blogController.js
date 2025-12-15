const blogModel = require("../models/Blog.js");
const { findById } = require("../models/User");
const asyncHandler = require("../utils/asyncHandler.js")
const paginate = require('../utils/paginate.js');

// creating a blog
exports.createBlog = asyncHandler(async (req, res)=>{
        const {title, content} = req.body;
        if(!title || !content){
            res.status(404);
            throw new Error('All Fields are required.')
        }
        const blog = await blogModel.create({
            title,
            content,
            author : req.user.id
        });
        res.json(blog);
})


// get all blogs

exports.getBlogs = asyncHandler(async(req,res)=>{
        const {page, limit, skip} = paginate(req);
        const blogs = await blogModel.find().populate('author','name email').skip(skip).limit(limit).sort({ createdAt: -1 });
        // total documents for client
        const total = await blogModel.countDocuments();

        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            blogs,
        });
})

// get single blog
exports.getBlog = asyncHandler(async(req,res)=>{
        const blog = await blogModel.findById(req.params.id).populate('author','name email');
        if(!blog){
            res.status(504);
            throw new Error('Blog not found')
        }
        res.json(blog);
})


// update blog

exports.updateBlog = asyncHandler(async (req,res)=>{
    const blog = await blogModel.findById(req.params.id);
        if(!blog){
            res.status(404);
            throw new Error('Blog not found');
        }

     

        if(blog.author.toString() !== req.user.id && req.user.role !== 'admin' ){
            res.status(403);
            throw new Error('Not authorized');
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();
        res.json(blog);
})

// delete blog

exports.deleteBlog = asyncHandler(async (req,res)=>{
const blog = await blogModel.findById(req.params.id);
        if (!blog){
            res.status(404);
            throw new Error("Blog not found");
        }
        if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized");
        }
        await blog.deleteOne();
        res.json({ message: "Blog deleted" });
}
)

// LIKE-unlike blog

exports.toggleLike = asyncHandler(async(req, res)=>{
const blog = await blogModel.findById(req.params.id);
        if(!blog){
            res.status(404);
            throw new Error('Blog was not found');
        } 

        const userId = req.user.id;
        const isLiked = blog.likes.includes(userId);

        if(isLiked){
            blog.likes = blog.likes.filter((id)=> id.toString() != userId);
        }else{
            blog.likes.push(userId);
        }

        await blog.save();
        res.json({
            likesCount : blog.likes.length
        })
})

exports.addComment = asyncHandler(async(req,res)=>{
   const blog = await blogModel.findById(req.params.id);
        if(!blog){
            res.status(404);
            throw new Error("Blog not found.");

        }
        if(!req.body.comment){
            res.status(404);
            throw new Error("Comment is required.");
        }
        blog.comments.push({
            user : req.user.id,
            comment : req.body.comment
        });

        await blog.save();
        res.json(blog.comments);
})