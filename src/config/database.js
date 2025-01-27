const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://admin:admin123@personal.mldib.mongodb.net/");
}

module.exports = connectDB;