const User=require("../Models/User.model")

const validsignup=async(req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send("Name Required")
    }
    if(!req.body.userId){
        return res.status(400).send("UserId Required")
    }
    const user=await User.findOne({userId:req.body.userId})
    if(user){
        return res.status(400).send("The User ID is already taken")
    }
    if(!req.body.password){
        return res.status(400).send("Password Required")
    }
    if(!req.body.email){
        return res.status(400).send("email Required")
    }
    const useremail=await User.findOne({email:req.body.email})
    if(useremail){
        return res.status(400).send("The Email ID is already taken")
    }
    next()
}
const validSignin=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send("userId required")
    }
    if(!req.body.password){
        return res.status(400).send("Password Required")
    }
    next()

}






const ValidUser={
    validsignup:validsignup,
    validSignin:validSignin
}

module.exports=ValidUser