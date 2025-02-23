const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId",["FirstName" ,"lastName", "photoUrl", "age", "gender", "skills"]);
        res.json({
            message: "Data fetched successfully",
            data: connectionRequest,
        })
    } catch (err) {
        res.status(400).send("ERROR :"+err.message);
    }
});

module.exports = {userRouter};