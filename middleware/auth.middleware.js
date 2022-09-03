const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const auth=require("../Config/Auth.config")
const User=require("../Models/User.model")
const verifytoken=async(req,res,next)=>{
    let accesstoken=req.headers["x-access-token"]
    if(!accesstoken){
        return res.status(400).send("Token invalid")
    }
    jwt.verify(accesstoken,auth.secret,(err,decoded)=>{
        if(err){
            return res.status(400).send("Invalid token")
        }
        req.user=decoded.id
        next()
    })
}

const validtoken={
    verifytoken:verifytoken
}
module.exports=validtoken