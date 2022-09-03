const Health=require("../Models/health.model")
const constants=require("../Utils/health.util")
const User=require("../Models/User.model")
function Check(health){
    if(health.bloodpressure>120){
        health.symptoms.push(constants.symptomps.highbloodpressure)
    }
    else if(health.bloodpressure<80){
        health.symptoms.push(constants.symptomps.lowbloodpressure)
    }
    if(health.temperature>99.8){
        health.symptoms.push(constants.symptomps.hightemperture)
    }
    else if(health.temperature<96){
        health.symptoms.push(constants.symptomps.lowtemperature)
    }
    if(health.sugarLevel>140){
        
        health.symptoms.push(constants.symptomps.highsugarlevel)
    }
    else if(health.sugarLevel<80){
        health.symptoms.push(constants.symptomps.lowsugarlevel)
    }
    const assumedvalue=[[constants.symptomps.highsugarlevel,constants.symptomps.highbloodpressure,constants.symptomps.lowbloodpressure,constants.symptomps.hightemperture,constants.symptomps.lowsugarlevel,constants.symptomps.lowtemperature]]
    if(health.symptoms.includes(constants.symptomps.normal)){
        health.symptoms.splice(0,1)
    }
}




exports.create=async(req,res)=>{
    
    try{
        const user=await User.findOne({userId:req.user})
        const healthobj={
            customerId:user._id,
            height:req.body.height,
            weight:req.body.weight,
            bloodpressure:req.body.bloodpressure,
            sugarLevel:req.body.sugarLevel,
            temperature:req.body.temperature,
            symptoms:[]
        }
        Check(healthobj)
        const health=await Health.create(healthobj)
        console.log(health)
        
        user.healthRecord.push(health._id)
        await user.save()
        console.log("This is user",user.healthRecord)
        res.status(201).send(health)
    }
    catch(err){
        console.log("controller/health/create",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.update=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        const health=await Health.findOne({_id:req.params.id})
        if(!user){
            return res.status(400).send("No Such User")
        }
        health.height=req.body.height!==undefined ? req.body.height: health.height
        health.weight=req.body.weight!==undefined ? req.body.weight: health.weight
        health.bloodpressure=req.body.bloodpressure!==undefined ? req.body.bloodpressure: health.bloodpressure
        health.sugarLevel=req.body.sugarLevel!==undefined ? req.body.sugarLevel: health.sugarLevel
        health.temperature=req.body.temperature!==undefined? req.body.temperature:health. temperature
        if(health){
            Check(health)
        }
        const healthup=await health.save()
        console.log(healthup)
        await user.save()
        res.status(201).send(healthup)
    }
    catch(err){
        console.log("controller/health/update",err)
        res.status(500).send("There was an error from our side")
    }

}

exports.deletearecord=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        const health=await Health.findOne({_id:req.params.id})
        
        await health.deleteOne({_id:health._id})
        res.status(200).send("Deleted Successfully")
    }
    catch(err){
        console.log("controller/health/deleterecord",err)
        res.status(500).send("There was an error from our side")
    }
}

exports.getallorders=async(req,res)=>{
    try{
        const user=await User.findOne({userId:req.user})
        let queryobj={}
        if(user.healthRecord==null){
            return res.status(400).send("No Health Record Yet!! Create one")
        }
        const userrecord=user.healthRecord
        queryobj={$and:[{"_id":{$in:userrecord}},{"deleted":false}]}
        const healthrecord=await Health.find(queryobj)
        res.status(200).send(healthrecord)
    }
    catch(err){
        console.log("controller/health/getallorders",err)
        res.status(500).send("There was an error from our side")
    }
}