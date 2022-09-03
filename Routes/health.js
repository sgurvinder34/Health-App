const controller=require("../controller/health.controller")
const middlware=require("../middleware/auth.middleware")

module.exports=(app)=>{
    app.post("/health/api/v1/user/healthRecord",[middlware.verifytoken],controller.create)
    app.put("/health/api/v1/user/healthRecord/:id",[middlware.verifytoken],controller.update)
    app.delete("/health/api/v1/user/healthRecord/delete/:id",[middlware.verifytoken],controller.deletearecord)
    app.get("/health/api/v1/user/healthRecord/allrecord",[middlware.verifytoken],controller.getallorders)
}