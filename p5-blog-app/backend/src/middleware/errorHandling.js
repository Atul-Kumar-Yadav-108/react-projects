const errorHandling = (err, req, res, next)=>{
    if(process.env.NODE_ENV === 'production'){
        err.stack = null;
    }
    console.log(err.stack);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message || "Server Error",
    });
}

module.exports = errorHandling