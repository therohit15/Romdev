const express = require("express");
const app = express();
const port = 3000;
app.use('/test',(req,res)=>{
    res.send("Test successful");
})
app.use("/hello",(req,res)=>{
    res.send("hello hello hello");
})
app.use("/",(req,res)=>{
    res.send("Hello world");
})
app.listen(port,()=>{
    console.log("Server is successfully listening on port 3000");
})