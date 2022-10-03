const postmodel=require('../models/postModel.js')
const upload=require('../aws/aws.js')
const isvalid=function(value){
    if(typeof value=='undefined'|| value==null) return false
    if(typeof value=='string'&& value.trim().length==0)return false
    return true;
}
 let isvalidData=function(data){
    return Object.keys(data).length > 0;
 }
const createPost=async (req,res)=>{
    
    try {
        let data=req.body
    let files=req.files
    if(!isvalidData(data)){
        return res.status(400).send({status:false,msg:"please provide details"})
    }
    let imageurl= await upload.uploadFile(files[0])
    
    
    } catch (error) {
        
    }
}