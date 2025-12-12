const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log("token 1",token)
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided, unauthorized"
            });
        }
        console.log("token 2",token)

        // If format = "Bearer xxxx"
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode; // { id: xx, email: xx }
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
