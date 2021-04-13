const express=require("express");
const {signup,signin, emailActivation} =require("../Controllers/UserController");

const router=express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get("/activate/:token",emailActivation);

module.exports=router;