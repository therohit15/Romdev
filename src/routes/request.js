const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const {ConnectionRequest} = require("../models/connectionRequest.js");
requestRouter.post("/request/send/:status/:userId", userAuth, async (req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;
        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type "+status});
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection Request Already Exists" });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save();
        return res.status(201).json({
            message: "Connection request sent successfully",
            request: savedRequest,
        });
    } catch (err) {
        res.status(400).send("Error : "+ err.message);
    }
})
module.exports = {requestRouter};