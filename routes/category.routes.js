const cate_controller = require("../controllers/category.controller")
const authmw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/categories",cate_controller.createNewCategory)
}