/**
 * creating category for products
 * POST localhost:8888/ecomm/api/v1/auth/categories
 */

 const category_model = require("../models/category.model");
exports.createNewCategory = async(req,res)=>{
    //Read the request body
    //Create the category object
    const cat_data= {
        name : req.body.name,
        description : req.body.description
    }
    //Insert in to mongoDB
    try{
        const category = await category_model.create(cat_data)
        return res.status(201).send(category)

    } catch(err){
        console.log("Error while creating category", err)
        return res.status(500).send({
            message : "Error while creating category"
        })
    }
    //return the response of the created category


}