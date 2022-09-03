const controller=require("../controller/auth.controller")
const middleware=require("../middleware/verifySignup")
module.exports=(app)=>{
    app.post("/health/api/v1/user/signup",[middleware.validsignup],controller.Signup)
    app.post("/health/api/v1/user/signin",[middleware.validSignin],controller.Signin)
}