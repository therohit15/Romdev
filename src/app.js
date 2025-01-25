const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
app.get("/user",(req,res)=>{
    res.send({
        "firstname":"Rohit",
        "lastname": "K"
    })
});
app.post("/user",(req,res)=>{
    res.send("User successfully saved to the database");
});
app.delete("/user",(req,res)=>{
    res.send("User successfully deleted from the database");
})
app.listen(port,()=>{
    console.log("Server is successfully listening on port 3000");
})