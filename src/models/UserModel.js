const mongoose =  require('mongoose')
const UserSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
     User_name:{
      type:String,
      required:true,
      unique:true
     },
    Gender:{ type:String,
        enum:["Male","Female","Other"],
        required:true     
    },
    Mobile:{type:Number,
        required:true,
        unique:true
    },
    Profile:{
        type:String,
        enum:["Public","Private"],
        default:"Public"
    },
    ProfilePicture:{
        type:String,
        default:""
    }
},{timestamps:true}
)
module.exports=mongoose.model("USER-Registration",UserSchema)