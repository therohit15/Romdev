const express = require("express");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const connectDB = require("./config/database.js");
const validator = require("validator");
const User = require("./models/user.js");
const {validateSignUpData} = require("./utils/validation.js")
const app = express();
const port = 3000;
app.use(express.json());
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
        if(!validator.isEmail(email)){
            throw new Error("Invalid email");
        }
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("Login successful");
        }else{
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR : "+err);
}
});
app.get("/user",async (req,res)=>{
    const userEmail = await User.find({email:req.body.email});
    try{
        if(userEmail.length===0){
            res.status(404).send("Email not found");
        }else{
            res.send(userEmail);
        }
    }catch(err){
        res.status(400).send("Error occured");
    }
})
app.get("/feed",async (req,res)=>{
    const users = await User.find({});
    try{
        if(users.length===0){
            res.status(404).send("No users found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Error occured");
    }
})
app.delete("/user", async(req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);            
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Error occured");
    }
});
app.patch("/user/:userId", async(req,res)=>{ 
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["password","age","photoUrl","gender","skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(req.body.skills.length>=10){
            throw new Error("Skills can't be more than 10")
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{
            new:true,
            runValidators:true
        });        
        res.send("User updated successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
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
