const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
const {adminAuth,userAuth} = require("./middlewares/auth.js");
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
})
app.listen(port,()=>{
    console.log("Server is successfully listening on port 3000");
})