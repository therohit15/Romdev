const express = require("express");
const res = require("express/lib/response");
const app = express();
const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked");
    const token = "rohit";
    const isAdminAuthorized = token==="rohit";
    if(!isAdminAuthorized){
        res.status(201).send("Authentication Failed");
    }else{
        next();
    }
}
const userAuth = (req,res,next)=>{
    console.log("User auth is getting checked");
    const token = "rohit";
    const isUserAuthorized = token==="rohit";
    if(!isUserAuthorized){
        res.status(201).send("Authentication Failed");
    }else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}