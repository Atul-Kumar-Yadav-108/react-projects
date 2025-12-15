const userModel = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require("../utils/asyncHandler.js");

exports.register = asyncHandler(async(req,res)=>{
         const {name, email , password } = req.body;
        if(!name || !email || !password){
            res.status(404);
            throw new Error('All fields are required');
        }
        const existinguser = await userModel.findOne({email});

        if(existinguser){
            res.status(400);
            throw new Error('User already exists')
        }

        const hashedpassword  = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password : hashedpassword
        });

        res.status(200).json({
            message : "User registered successfully."
        })
})

exports.login = asyncHandler(async(req,res)=>{
   const {email, password} = req.body;
        if(!email || !password){
            res.status(404);
            throw new Error('All fields are required.')
        }
        // check user
        const existinguser = await userModel.findOne({email});
        if(!existinguser){
            res.status(400);
            throw new Error("Invalid credential");
        }
        
        // match password
        const isMatch = await bcrypt.compare(password, existinguser.password);
        if(!isMatch){
            res.status(400);
            throw new Error("Invalid Password");
        }

        // token 
        const token = await jwt.sign({id : existinguser._id, role : existinguser.role}, process.env.JWT_SECRET, {expiresIn : '1d' });

        res.json({
            token,
            user : {
                id: existinguser._id,
                name: existinguser.name,
                email: existinguser.email,
                role: existinguser.role,
            }
        })
})