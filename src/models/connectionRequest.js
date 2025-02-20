const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignore","accepted","interested","rejected"],
            message:"{VALUE} is incorrect status type"
        },
    },
},{
    timestamps:true,
});
const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports={
    ConnectionRequest,
};