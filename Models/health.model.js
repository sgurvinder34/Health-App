const constants=require("../Utils/health.util")
const mongoose=require("mongoose")


const healthObj=new mongoose.Schema({
    customer_id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true,
    },
    bloodpressure:{
        type:Number,
        required:true
    },
    sugarLevel:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    symptoms:{
        type:[String],
        default:constants.symptomps.normal,
        enum:[constants.symptomps.highsugarlevel,constants.symptomps.highbloodpressure,constants.symptomps.lowbloodpressure,constants.symptomps.hightemperture,constants.symptomps.lowsugarlevel,constants.symptomps.lowtemperature,constants.symptomps.normal]
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    upadatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    }
})


module.exports=mongoose.model("Health",healthObj)