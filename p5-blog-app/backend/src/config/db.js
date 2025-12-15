const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db Connected successful');
    } catch (error) {
        console.log('error ', error);
        process.exit(1);
    }
}

module.exports = connectDB;