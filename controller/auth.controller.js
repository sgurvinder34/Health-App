const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../Models/User.model")
const constants=require("../Utils/user.util")
const auth=require("../Config/Auth.config")

exports.Signup=async(req,res)=>{
    const userObj={
        name:req.body.name,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,10),
        email:req.body.email
    }
    try{
        const user=await User.create(userObj)

        res.status(201).send({
            name:user.name,
            userId:user.userId,
            emailId:user.email,
            createdAt:user.createdAt,
            updateAt:user.updatedAt
        })
    }
    catch(err){
        console.log("There is an error in controller/auth/signup")
        res.status(500).send("There was an error from our side")
    }
}

exports.Signin=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.body.userId})
    if(!user){
        return res.status(400).send("The userid is wrong")
    }
    const validpassword=bcrypt.compareSync(req.body.password,user.password)
    if(!validpassword){
        return res.status(400).send("InvalidPassword")
    }
    const token=jwt.sign({id:user.userId},auth.secret,{expiresIn:86400})
    res.status(201).send({
        name:user.name,
        email:user.email,
        userId:user.userId,
        createdAt:user.createdAt,
        updateAt:user.updatedAt,
        Access_token:token
    })

    }
    catch(err){
        console.log("Error in controller/auth/signin",err)
        res.status(500).send("There was an error from our side while signing in")
    }
    
}