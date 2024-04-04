/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller")
const authmw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup", authController.signup)

    /**
     * route for signIn
     * POST localhost:8888/ecomm/api/v1/auth/signin
     */

    app.post("/ecomm/api/v1/auth/signin",[authmw.verifyTokenS],authController.signin)
}