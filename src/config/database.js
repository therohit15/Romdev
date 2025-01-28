const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://<user>:<password>@<database>.mldib.mongodb.net/romdev");
}

module.exports = connectDB;