const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    content :{
        type :String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    comments :[
        {
            user  : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            },
            comment : String,
            createdAt : {
                type : String,
                default : Date.now
            }
        }
    ]
},
{timestamps : true});

module.exports = mongoose.model('Blog',blogSchema);