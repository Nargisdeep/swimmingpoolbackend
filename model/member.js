const mongoose=require("mongoose")

const memberSchema= new mongoose.Schema({
admin_id:{
     type:String,
     required:true

},
 mainmember:{
    type:String,
    required:true
 },
 member1:{
    type:String
 },
 member2:{
    type:String
 },
 member3:{
    type:String
 },
 member4:{
    type:String
 },
 member5:{
    type:String
 },
 numofmales:{
    type:Number,
    required:true
 },
 numoffemales:{
    type:Number,
    required:true
 },
 mainmobile:{
    type:Number,
    required:true
 },
 memAddress:{
    type:String,
    required:true
},
sickness:{
    type:String,
    required:true
},
mainemail:{
     type:String,
     required:true
},
starttime:{
    type:String,
    required:true
},
endtime:{
    type:String
},
isActive:{
    type:Boolean,
    default:1
}
})
const memberModel = mongoose.model("MemberModel",memberSchema)

module.exports = memberModel
