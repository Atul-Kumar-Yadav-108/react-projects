const path = require('path')
require('dotenv').config()

const express = require("express");
const app = express();
const cors = require('cors');
const connectDB= require("../src/config/db.js");
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js");
const blogRoute = require("./routes/blogRoute.js");
const errorHandling = require('./middleware/errorHandling.js')
const limiter = require('./middleware/rateLimiter.js');
const slowdownLimiter = require("./middleware/slowLimit.js");
const handleUserAgent = require('./middleware/handleUserAgent.js');

connectDB();
// middleware
app.use(cors());
// in production
// 
// app.use(cors({ origin: "http://yourfrontend.com", credentials: true, }));

app.use(express.json({limit : '10mb'}));
app.use(express.urlencoded({extended : true, limit : '10mb'}));
app.use("/uploads", express.static("uploads"));

app.use('/api/blogs',slowdownLimiter);
app.use('/api',limiter);
app.use('/api/blogs',handleUserAgent);

// routes

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/blogs',blogRoute);

app.get('/',(req,res)=>{
    res.send(`Welcome to making new world for me...`);
})

app.use(errorHandling)

module.exports = app;