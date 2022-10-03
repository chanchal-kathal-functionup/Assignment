const mongoose=require('mongoose')
const postSchema= new mongoose.mongoose.Schema({
     Text:{
        type:String
     },
     Image:{
        type:[String]
     },
     video:{
        type:[String]
     },
     Status:{
        type:String,
        enum:['Public',"Private"]
     },
     Friendtag:{
      type:[String]
     },
     Hashtag:{
      type:[String]
     },
     Comment:{
      type:String
     },
     isDeleted:{
      type:Boolean,
      default:false
     }
},{timestamps:true})
module.exports=mongoose.model("Post", postSchema)