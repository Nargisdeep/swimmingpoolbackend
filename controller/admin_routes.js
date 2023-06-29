var express = require('express');
const adminModel=require('../model/admin')
const  ObjectID = require('mongodb').ObjectId;
const nodemailer = require('nodemailer');
var fs=require('fs')
var Hogan=require('hogan.js')
var template=fs.readFileSync('./views/index.hjs','utf-8')
var comtemplate=Hogan.compile(template)


let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	method:'secure',
	auth: {
		user: 'nargisdeepkaur@gmail.com',
		pass: 'ipxazitgalyjxatp'
	}
});
mailTransporter.verify(function(error, success) {
	if (error) {
		  console.log(error);
	} else {
		  console.log('Server is ready to take our messages');
	}
});




//Post Request
exports.adminPost=async(request,response) =>{
  const admins=await adminModel.find({})
  if(admins.find((e)=>e.adminemail==request.body.adminemail)){
    return response.status(306).json({"message":"Email Already Existed"})
  }
  else if(admins.find((e)=>e.poolname == request.body.poolname)){
    return response.status(306).json({"message":"Pool Name already Existed"})
  }
  else if(admins.find((e)=>e.poollocation== request.body.poollocation)){
    return response.status(306).json({"message":"Pool Location Already Existed"})
  }
  else if(admins.find((e)=>e.adminusername==request.body.adminusername)){
    return response.status(306).json({"message":"Username Already Existed"})
  }
  else if(admins.find((e)=>e.adminmobile==request.body.adminmobile)){
    return response.status(306).json({"message":"Mobile Number Already Exists"}) 
  }
  const admin=new adminModel(request.body)
  let mailOptions = {
    from:'nargisdeepkaur@gmail.com',
    to: request.body.adminemail,
    subject:`Welcome to GoSwim ${request.body.adminname}`,
    html:comtemplate.render({adminname:request.body.adminname,adminusername:request.body.adminusername})
  }
  mailTransporter.sendMail(mailOptions, function(err, data) {
    if(err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  })
  try{
    
      await admin.save()
      response.status(200).send({status:true,admin:admin})
  }
  catch(error){
      await(error)
       response.status(500).send(error)
      
  }
}
exports.verifyPassword=async(request,response)=>{
  const admin=await adminModel.findOne({_id:new ObjectID(request.params.id)})
   try{
    if(admin){
      if(admin.adminpassword==request.body.password){
        return response.status(200).json({"message":"Password is correct"})
      }
      else{
        return response.status(422).json({"message":"Password is incorrect"})
      }
    }
   }
   catch(error){
    console.log(error)
    return response.status(500).json(error)
   }
}
exports.changePassword=async(request,response)=>{
  console.log(request.params.id)
  const admin=await adminModel.updateOne({_id:new ObjectID(request.params.id)},{$set:{"adminpassword":request.body.newpassword}})
  try{
    response.status(200).send({status:true,admin:admin})
  }
  catch(error){
    response.status(500).send(error)
  }
  
  }
  
//Get Request All
exports.adminGetAll=async(request,response)=>{
  
  const admins=await adminModel.find({"isDeleted":false})
  try{
         response.status(200).send({status:true,admins:admins})
  }
  catch(error){
            response.status(500).send(error)
  }
}

//Get Requesst
exports.adminGet=async(request,response)=>{
  
    const admins=await adminModel.find({"isDeleted":false,"active":true})
    console.log(admins)
  
    try{
           response.status(200).send({status:true,admins:admins})
    }
    catch(error){
              response.status(500).send(error)
    }
}
//Get Request by ID
exports.adminGetByID=async(request,response)=>{
  console.log(request.params.id)
  const admin= await adminModel.findOne({_id:new ObjectID(request.params.id)})
 
  try{
         response.status(200).send({status:true,admin:admin})
  }
  catch(error){
            response.status(500).send(error)
  }
}
// Delete Request 
exports.adminDelete=async(request,response)=>{
const admin=await adminModel.updateOne({_id:new ObjectID(request.params.id)},{$set:{"isDeleted":true}})
try{
  response.status(200).send({status:true,admin:admin})
}
catch(error){
  response.status(500).send(error)
}

}

exports.adminPut=async(request,response)=>{
  console.log(request.params.id)
  const update=request.body
  console.log(update)
  const admin=await adminModel.updateOne({_id:ObjectID(request.params.id)},{$set:update})
  try{
    response.status(200).send({status:true,admin:admin})
  }
  catch(error){
    response.status(500).send(error)
  }
}
exports.adminChange=async(request,response)=>{
  console.log(request.params.id)
  console.log(request.body.active)
  console.log(request.body.pertoedithourlyrate)
  const admin=await adminModel.updateOne({_id:ObjectID(request.params.id)},{$set:{"active":request.body.active,
                                                                                  "pertoedithourlyrate":request.body.pertoedithourlyrate}})
  try{
    response.status(200).send({status:true,admin:admin})
  }
  catch(error){
    response.status(500).send(error)
  }
}

