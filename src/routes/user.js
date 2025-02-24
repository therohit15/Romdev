const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();
const USER_SAFE_DATA = ["FirstName" ,"lastName", "photoUrl", "age", "gender", "skills"];
userRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId",USER_SAFE_DATA);
        res.json({
            message: "Data fetched successfully",
            data: connectionRequest,
        })
    } catch (err) {
        res.status(400).send("ERROR :"+err.message);
    }
});

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try {
       const loggedInUser = req.user;
       const connectionRequest = await ConnectionRequest.find({
        $or:[
            {toUserId: loggedInUser._id, status: "accepted"},
            {fromUserId: loggedInUser._id, status: "accepted"}
        ]
       }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);
       const data = connectionRequest.map((row)=>{
        if(row.fromUserId.toString()==loggedInUser._id.toString()){
            return row.fromUserId;
        }
        return row.fromUserId});
       res.json({data}); 
    } catch (err) {
        res.status(400).json({
            message:err.message,
        })
    }
})
module.exports = {userRouter};