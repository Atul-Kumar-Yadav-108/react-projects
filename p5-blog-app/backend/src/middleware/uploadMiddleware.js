const multer = require('multer');
const path = require('path');

// ye hum storage location ke liye use karte hai
const storage = multer.diskStorage({
    destination(req, res, cb){
        cb(null, 'uploads/');
    },
    filename(req, res, cb){
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    },
});

// ab filter use karenge jisme hum like size type etc
const fileFilter = (req,res,cb)=>{
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)
    if(mimetype && extname) cb(null, true);
    else cb('Image only');
}

const upload = multer({
    storage,
    limits : {fileSize :  5*1024*1024}, // 5mb
    fileFilter,
})

module.exports = upload;