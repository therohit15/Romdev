const express = require("express");
const res = require("express/lib/response");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
const port = 3000;
app.use(express.json());
app.post("/signup",(req,res)=>{
    const user = new User(req.body);
    try {
        user.save();
        res.send("User added successfully");
    } catch (error) {
        res.send("Error occured");
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
            res.status(404).send("Email not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Error occured");
    }
})
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
