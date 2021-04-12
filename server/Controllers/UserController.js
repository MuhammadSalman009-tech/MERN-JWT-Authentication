const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const User = require("../Models/UserModel");

//Creating json web token (JWT)
const createToken=(email,id)=>{
    return jwt.sign({email,id},"authentication_secret",{expiresIn:'1h'});
}

//handling signup request
module.exports.signup=async(req,res)=>{
    const {firstName,lastName,email,password} = req.body; 
    try {
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(404).json({message:"User already exits!"});
        const hashedPassword=await bcrypt.hash(password,12);
        const savedUser=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
        //if user is successfully saved to database
        const token=createToken(savedUser.email,savedUser._id);
        res.status(200).json({result:savedUser,token})
    } catch (error) {
        console.log("siginup error");
        res.status(500).json({message:error.message});
    }
}

//handling signin request
module.exports.signin=async(req,res)=>{
    const {email,password} = req.body;
    try{
        const existingUser=await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User does not exits!"});
        const isMacthing=await bcrypt.compare(password,existingUser.password);
        if(!isMacthing) return res.status(400).json({message:"Incorrect Password!"});

        //if all credentials are correct
        const token=createToken(existingUser.email,existingUser._id);
        res.status(200).json({result:existingUser,token})

    }catch(error){
        console.log("Signin error");
        res.status(500).json({message:error.message});
    } 
}
