const express = require("express");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const connectDB = require("./config/database.js");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const {validateSignUpData} = require("./utils/validation.js")
const {userAuth} = require("./middlewares/auth.js");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.post("/signup",async (req,res)=>{
    try {
        validateSignUpData(req);
        const {firstName, lastName, email, password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            email,
            password:passwordHash
        });
        user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("ERROR : "+err);
    }
});
app.post("/login", async (req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email:email});
        if(!validator.isEmail(email)){
            throw new Error("Invalid email");
        }
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token",token);
            res.send("Login successful");
        }else{
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR : "+err);
}
});
app.get("/profile", userAuth, async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

connectDB().then(()=>{
    console.log("Database connection established...");
    app.listen(port,()=>{
        console.log("Server is successfully listening on port 3000");
    })
}).catch((err)=>{
    console.log("Database cannot be connected");
});
/*const {adminAuth,userAuth} = require("./middlewares/auth.js");
const { connection } = require("mongoose");
app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res)=>{
    try {
        throw new Error("xyz");
        res.send("All data send");
    } catch (err) {
        res.status(500).send("Something wrong contact support team");
    }
})
app.delete("/admin/deleteData",(req,res)=>{
    res.send("User data deleted");
})
app.post("/user/login",(req,res)=>{
    throw new Error("xyz");
    res.send("User logged in successfully");
})
app.get("/user/data",userAuth,(req,res)=>{
    res.send("User data sent");
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Request failed");
    }
})*/
