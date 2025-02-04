const validator = require("validator");
const validateSignUpData = (req)=>{
    const {firstName, lastName, email, password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is invalid");
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not Strong enough");
    }
    return
}
module.exports = {validateSignUpData};