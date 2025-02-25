const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
const USER_SAFE_DATA = ["firstName" ,"lastName", "photoUrl", "bio", "skills"];
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
});
userRouter.get("/user/feed", userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        limit = limit>50 ? 50 :limit;
        const connectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}],
        }).select(["fromUserId","toUserId"]);
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        const user = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}},
            ],
        }).select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);
        res.send(user);     
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});
module.exports = {userRouter};