const apierror = require("../utils/apiError.js")

const errorMiddleware = (err, req, res, next)=>{
    let status = err.statusCode || 500;
    let message = err.message || "Internal server error";

    return res.status(status).json({
        success : false,
        status,
        message : message,
        stack : process.env.NODE_ENV === "production" ? null : err.stack
    })
}

module.exports = errorMiddleware;