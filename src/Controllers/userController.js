const UserModel= require('../models/UserModel.js')
//const validator=require('validator')
const jwt=require('jsonwebtoken')
const upload=require('../aws/aws')


const isvalid=function(value){
    if(typeof value=='undefined'|| value==null) return false
    if(typeof value=='string'&& value.trim().length==0)return false
    return true;
}
 let isvalidData=function(data){
    return Object.keys(data).length > 0;
 }

const UserRegistration= async(req,res)=>{
    try {
        let data=req.body
         const{Name,User_name,Email,Password,Gender,Mobile,profilePicture}=data

         if(!isvalidData(data))
          return res.status(400).send({status:false,msg:"Please provide the details"})
         if(!isvalid(Name)){
            return res.status(400).send({status:false,msg:"Name is required"}) 
         }
         if(!isvalid(Email)){
            return res.status(400).send({status:false,msg:"Email is required"}) 
         }
         const validEmail=function(Email){
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return reg.test(Email)
   }
   if(!validEmail(Email)){
    return res.status(400).send({status:false,msg:"Please enter valid email-id"})
   }
   const duplicateEmail=await UserModel.findOne({Email:Email})
   if(duplicateEmail){
    return res.status(409).send({status:false,message:"This Email address is already register,please use different Email-id"})
         
   }
         if(!isvalid(Password)){
            return res.status(400).send({status:false,msg:"Password is required"}) 
         }
         if(Password.length<8){
            return res.status(400).send({status:false,msg:"password should contain minimum 8 letters"})
         }
         const isValidPassword = (password) => {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password.trim());
          };
          if(!isValidPassword(Password)){
            return res.status(400).send({status:false,msg:"Password should contain at-least one number,one special character and one capital letter with length in between 8-15", })
            
          }        
         if(!isvalid(User_name)){
            return res.status(400).send({status:false,msg:"User_name is required"}) 
         }
         const duplicateName= await UserModel.findOne({User_name:User_name})
         if(duplicateName){
             return res.status(409).send({status:false,message:"User_name should be unique"})
         }
         if(!isvalid(Gender)){
            return res.status(400).send({status:false,msg:"Gender is required"}) 
         }
         if(!isvalid(Mobile)){
            return res.status(400).send({status:false,msg:"Please provide the mobile no."}) 
         }
         const validatePhone = function (mobileString){

            reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return reg.test(mobileString);
         }
         if(!validatePhone(Mobile))
         return res.status(400).send({status:false,message:"Please enter valid Mobile no."})
    
         const duplicateNo= await UserModel.findOne({Mobile:Mobile})
         if(duplicateNo){
             return res.status(409).send({status:false,message:"This Mobile no.is already register"})
         }
         //let files = req.files

      //   let profilepicurl = await upload.uploadFile(files[0])
      //   data.profilePicture = profilepicurl

         const registered= await UserModel.create(data)
         return res.status(201).send({status:true,data:registered})
         
    } catch (error) {
      return res.status(500).send({status:false,msg:error})
        
    }

}

const loginUser=async (req,res)=>{
   try {
      let data=req.body
      const{Email,Password}=data
      if(!isvalidData(data)){
         return res.status(400).send({status:false,msg:"Please provide the details"})
      }
      if(!isvalid(Email)){
         return res.status(400).send({status:false,msg:"Please provide the Email address"})
      }
      const validEmail=function(Email){
         reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     return reg.test(Email)
}
if(!validEmail(Email)){
 return res.status(400).send({status:false,msg:"Please enter valid email-id"})
}
const finduser= await UserModel.findOne({Email:Email})
if(!finduser){
   return res.status(404).send({status:false,msg:"User not found"})
}
      if(!isvalid(Password)){
         return res.status(400).send({status:false,msg:"Please provide the Password"})
      }
      const isValidPassword = (password) => {
         return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password.trim());
       };
       if(!isValidPassword(Password))
         return res.status(400).send({status:false,msg:"Password is not valid", })
               
         const checkpassword= await UserModel.findOne({Password:Password})
         if(!checkpassword)
         return res.status(404).send({status:false,msg:"Incorrect Password"})
         let token = jwt.sign(
         { userId: finduser._id },
         "ISTREAM", { expiresIn: '12h' }  //secreatkey
       );
       return res.status(201).send({status:true,msg:"User Login Successfully", data:{userId:finduser._id,token:token}})
      
   } catch (error) {
      return res.status(500).send({status:false,msg:error.message})
   }
}
module.exports.UserRegistration=UserRegistration
module.exports.loginUser=loginUser