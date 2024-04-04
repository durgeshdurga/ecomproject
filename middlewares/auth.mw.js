const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")

/**
 * Crreate a mw will check if the request body is proper and correct
 */
const verifySignUpBody = async(req,res,next)=>{
    try{
        /**
         * check for the same
         */
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name was not provided in request body"
            })
        }
        //check for the email
        if(!req.body.email){
            return res.status(401).send({
                message : "Failed ! Email was not provided in request body"
            })
        }
        //Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not provided in request body"
            })
        }
        next()

    }catch(err){
        console.log("Wrong Credentials");
    }
}

const verifySignInBody = async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "UserId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }
    next()
}

const verifyToken = (req,res,next)=>{
    // if the token is present in the header
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message : "No token found : unAuthorised"
        })
    }
    //if it's the valid token
    jwt.verify(token,auth_config.secret,async(err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorized"
            })
        }
        const user = await user_model.findOne({userId : decoded.id})
        if(!user){
            return res.status(402).send({
                message : "UnAuthorized"
            })
        }
    })
    next()
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken
}