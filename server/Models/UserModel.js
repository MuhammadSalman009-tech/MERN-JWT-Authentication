const mongoose=require("mongoose");
const {isEmail}= require("validator");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type:String
    }
});


const User=mongoose.model('user',userSchema);
module.exports = User;