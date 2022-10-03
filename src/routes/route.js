const express = require('express');

const router = express.Router();
const userController=require('../Controllers/userController.js')
 router.post("/Registration",userController.UserRegistration)
 router.post("/login",userController.loginUser)

module.exports=router;