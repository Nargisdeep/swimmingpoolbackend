var express = require('express');
const memberModel=require('../model/member')
const  ObjectID = require('mongodb').ObjectId;



exports.memberPost=async(request,response) =>{
    const member=new memberModel(request.body)
        console.log(member)
    try{
        await member.save()
        response.status(200).send({status:true,member:member})
    }
    catch(error){
        await(error)
         response.status(500).send(error)
        
    }
}
exports.memberGet=async(request,response)=>{
    const admin_id=request.params.id
    const members=await memberModel.find({"admin_id":admin_id})
    try{
           response.status(200).send({status:true,members:members})
    }
    catch(error){
              response.status(500).send(error)
    }
}
exports.memberGetDashboard=async(request,response)=>{
    const admin_id=request.params.id
    const members=await memberModel.find({"admin_id":admin_id,"isActive":true})
    try{
           response.status(200).send({status:true,members:members})
    }
    catch(error){
              response.status(500).send(error)
    }
}
exports.memberDelete=async(request,response)=>{
    console.log(request.params.id)
    const member=await memberModel.updateOne({_id:new ObjectID(request.params.id)},{$set:{"isActive":false}})
    try{
      response.status(200).send({status:true,member:member})
    }
    catch(error){
      response.status(500).send(error)
    }
}
exports.memberGetByID=async(request,response)=>{
    console.log(request.params.id)
    const member= await memberModel.findOne({_id:new ObjectID(request.params.id)})
   
    try{
           response.status(200).send({status:true,member:member})
    }
    catch(error){
              response.status(500).send(error)
    }
}
exports.memberPut=async(request,response)=>{
    console.log(request.params.id)
    const update=request.body
    console.log(update)
     const member=await memberModel.updateOne({_id:ObjectID(request.params.id)},{$set:update})
    try{
      response.status(200).send({status:true,member:member})
    }
    catch(error){
      response.status(500).send(error)
    }
  }
exports.patchEndTime=async(request,response)=>{
  console.log(request.params.id)
    
    
     const member=await memberModel.updateOne({_id:ObjectID(request.params.id)},{$set:{"endtime":request.body.endtime}})
    try{
      response.status(200).send({status:true,member:member})
    }
    catch(error){
      response.status(500).send(error)
    }

}