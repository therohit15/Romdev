const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:4,
        maxLength:30
    },
    lastName:{
        type: String,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:20
    },
    age:{
        type:Number,
        
    },
    photoUrl:{
        type:String,
        default:"https://cdn.vectorstock.com/i/500p/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
    },
    gender:{
        type:String,
        trim:true,
        enum: ["male", "female", "others"], 
    },
    skills:{
        type:[String]
    },
    bio:{
        type:String,
        default:"This is a new user",
        maxLength:200
    }
},{
    timestamps:true
});
module.exports = mongoose.model("User",userSchema);