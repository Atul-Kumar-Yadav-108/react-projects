const authService = require('../services/auth.services');
const apiResponse = require("../utils/apiResponse");
const apiError = require("../utils/apiError");

exports.register = async(req, res, next)=>{
  try {
    const {name, email, password} = req.body;
    console.log(`enter hua main ${name} ${email} ${password}`);
    
    if (!name || !email || !password) {
        return res.status(401).send({success : false, message : "All fields are required."})
      
    }
    const user = await authService.resgisterUser(name, email, password);

    return res
    .status(201)
    .json(new apiResponse(201, user, "User registered successfully"));
  } catch (error) {
    next(error);  // GLOBAL ERROR HANDLER KO CALL KAREGA
  }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({success : false, message : "All fields are required."})
        }
        // 👇 Yeh sahi tarike se destructure karo
        const { user, token } = await authService.loginUser(email, password);

        // 👇 Cookie set
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // localhost ke liye false
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(
            new apiResponse(200, { user, token }, "Login success")
        );

    } catch (error) {
        next(error);
    }
};
