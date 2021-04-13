const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const sendEmail=require("./sendMail");

const User = require("../Models/UserModel");


//validating user email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
//Creating (JWT) activation token
function createActivationToken(id){
    return jwt.sign({id},process.env.ACTIVATION_TOKEN_SECRET,{expiresIn:'10m'});
}
//Creating user access token (JWT)
const createAccessToken=(email,id)=>{
    return jwt.sign({email,id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
}

//handling signup request
module.exports.signup=async(req,res)=>{
    const {firstName,lastName,email,password} = req.body; 
    try {
        //checking if the user inputs are empty
        if(!firstName) return res.status(400).json({firstNameErr:"First Name is required"});
        if(!lastName) return res.status(400).json({lastNameErr:"Last Name is required"});
        if(!email) return res.status(400).json({emailErr:"Email is required"});
        if(!password) return res.status(400).json({passwordErr:"Password is required"});

        //checking if the user entered correct email    
        if(!validateEmail(email))
            return res.status(400).json({emailErr:"Invalid Email Address"});

        //checking if the user already exists in our db
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(404).json({emailErr:"User already exits!"});

        //checking password length      
        if(password.length<6)
            return res.status(400).json({passwordErr:"Password must be at least 6 characters"});
        
        const hashedPassword=await bcrypt.hash(password,12);
        const savedUser=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
        //if user is successfully saved to database
        const activation_token=createActivationToken(savedUser._id);
        const url=`http://localhost:5000/user/activate/${activation_token}`;
        //Sending activation email to user
        const EMail=sendEmail(savedUser.email,url,"Click the link below to activate your account");
        if(EMail!==null){
            savedUser.activationToken=activation_token;
            savedUser.save();
            return res.json({emailSuccess:"Please check your email inbox to activate your account"});
        }else{
            return res.json({emailFailure:"Email not sent"});
        }
        
    } catch (error) {
        console.log("siginup error");
        res.status(500).json({msg:error.message});
    }
}
//handling email activation end point
module.exports.emailActivation=async(req,res)=>{
    try {
        const user=await User.findOne({activationToken:req.params.token});
        if(user){
            user.activationToken=null;
            user.isVerified=true;
            user.save();
            return res.redirect(`${process.env.CLIENT_URL}/email-verification`);
        }else{
            return res.status(500).json({msg:"Error in activating user"});
        }
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
},


//handling signin request
module.exports.signin=async(req,res)=>{
    const {email,password} = req.body;
    try{
        if(!email){
            return res.status(400).json({emailErr:"Please Enter Email Address"});
        }if(!password){
            return res.status(400).json({passwordErr:"Please Enter Password"});
        }
        //checking if the user exists in our db
        const existingUser=await User.findOne({email});
            if(!existingUser){
                return res.status(404).json({emailErr:"User does not exits!"});
            }else{
                if(existingUser.isVerified===false){
                    return res.status(400).json({notVerified:"Please verify your email before Sign In.Go to your inbox and check for confirmation email"});
                }else{
                    const isMatching=await bcrypt.compare(password,existingUser.password);
                    if(isMatching){
                        //if all credentials are correct
                        const token=createAccessToken(existingUser.email,existingUser._id);
                        res.status(200).json({result:existingUser,token})
                    }else{
                        return res.status(400).json({passwordErr:"Incorrect Password!"});
                    }
                }
                
            }
    }catch(error){
        console.log("Signin error");
        res.status(500).json({msg:error.message});
    } 
}
