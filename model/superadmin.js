const mongoose=require("mongoose")

const superadminSchema= new mongoose.Schema({
  
    image:{
       type:String,
       required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"superadmin"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
    
})
const SuperAdmin = mongoose.model("SuperAdmin",superadminSchema)

module.exports = SuperAdmin
