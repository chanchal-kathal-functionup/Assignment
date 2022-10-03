const mongoose=require('mongoose')

const express=require('express')

const app=express()
const route=require('./routes/route.js')
const multer = require('multer'); 
const bodyParser = require('body-parser')
app.use(multer().any())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://harshshri:harsh001@cluster0.zdm3o.mongodb.net/chanchalBlog",{useNewUrlParser:true})
.then(()=>{console.log("MongoDB is successfully Connected")})
.catch((err)=>{console.log(err)})


app.use('/', route);
app.listen(process.env.PORT|| 3000,()=>{
    console.log("Sever is running on 3000")
})
