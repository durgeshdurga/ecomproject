/**
 * This will be the starting point
 */
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const server_config = require("./configs/server.config");
const user_model = require("./models/user.model");
app.use(express.json()); // this is called middlewares

/**
 * Create an admin if not present already
 */
const db_config = require("./configs/db.config");
/**
 * Connection with mongodb
 */
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.once("open",()=>{
    console.log("Connection successfull");
    init();
})
db.on("error",()=>{
    console.log("Error while connecting to mongodb");
})

async function init(){
    try{
        let user = await user_model.findOne({userId : "admin"})
        if(user){
            console.log("Admin is already present");
            return
        }
    }catch(err){
        console.log("Error while reading data",err);
    }
    try{
        user = await user_model.create({
            name : "Durgesh",
            userId : "admin",
            password  : bcrypt.hashSync("Welcome@1",9),
            userType : "ADMIN",
            email : "durgesh123@gmail.com" 
        })
        console.log("Admin created : ",user);

    }
    catch(err){
        console.log("Error while creating admin",err);
    }
}

/**
 * Stich the route to the server
 */

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)

/**
 * express connection 
 */
app.listen(server_config.PORT,()=>{
    console.log("Server started at port no : ", server_config.PORT);
})
