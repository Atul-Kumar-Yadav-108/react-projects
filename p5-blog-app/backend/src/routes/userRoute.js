const express = require('express')
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();


router.get('/me',authMiddleware, (req,res)=>{
    return res.json({ message: "This is protected route", user : req.user});
})


module.exports = router;