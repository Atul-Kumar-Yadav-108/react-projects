module.exports= (req,res,next)=>{
    const ua = req.headers['user-agent'];
    if(!ua){
        res.status(403);
        throw new Error('Bot blocked');
    }
    next()
}