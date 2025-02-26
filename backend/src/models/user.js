const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Not an email"+value);
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("Not a strong password"+value);
        }
    },
    age:{
        type:Number,
        
    },
    photoUrl:{
        type:String,
        default:"https://cdn.vectorstock.com/i/500p/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
        validate(value){
            if(!validator.isURL(value))
                throw new Error("Not a URL"+value);
        }
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
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "password",{expiresIn: "7d"});
    return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid =  await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}
module.exports = mongoose.model("User",userSchema);