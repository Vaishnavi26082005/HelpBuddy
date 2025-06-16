import config from "../config.js";
import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup=async (req,res)=>{
    const {firstName,lastName,email,password}=req.body
   
    try {
        const user= await User.findOne({email});
        //400-bad request
        if(user){
            return res.status(400).json({meassage:"User already exist "})
        }
        
        const hashPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        })
        newUser.save()
        return res.status(201).json({message:"User created successfully",user:newUser});
    } catch (error) {
        console.log("error in signup",error);
        return res.status(500).json({message:"Internal server error"});
        
    }

}

export const login=async(req,res)=>{
 const {email,password}=req.body;
 try {
    const user=await User.findOne({
        email:email
    })
    const isPassword=await bcrypt.compare(password,user.password);
    if(!user){
        return res.status(400).json({message:"User does not exist"});
    }
    if(!isPassword){
        return res.status(400).json({message:"Password is incorrect"});
    }

    //jwt
    const token= jwt.sign({id:user._id},config.JWT_SECRET,{
        expiresIn:"1d"
    })
    const cookieoption={
        expires:new Date(Date.now()+3*24*60*60*1000), //3 days
        httpOnly:true,//jisse cookie directly access na ho sake from client side
        secure:process.env.NODE_ENV === "production" ? true : false, //cookie will be sent only in https connection
        sameSite:"strict" //cookie will be sent only in same site , protects against CSRF attacks
    }
    res.cookie("jwt",token,cookieoption);

    return res.status(200).json({message:"Login successful",user,token});
 } catch (error) {
    console.log("error in login",error);
    return res.status(500).json({message:"Internal server error"});
    
 }
}



export const logout=(req,res)=>{
  try {
    res.clearCookie("jwt")
    return res.status(200).json({message:"Logout succeeded"})

    
  } catch (error) {
    console.log("Error in logout");
    return res.status(500).json({errors:"Error in logout"});
    
  }

}