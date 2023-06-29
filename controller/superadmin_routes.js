var express = require('express');
const superadminModel=require('../model/superadmin')
const  ObjectID = require('mongodb').ObjectId;

//Post Request
exports.superadminPost=async(request,response) =>{
  const superadmin=new superadminModel(request.body)
      console.log(superadmin)
  try{
      await superadmin.save()
      response.status(200).send({status:true,superadmin:superadmin})
  }
  catch(error){
      await(error)
       response.status(500).send(error)
      
  }
}
exports.superadminGet=async(request,response)=>{
  
    const superadmin=await superadminModel.findOne({"email":"nargisdeepkaur@gmail.com"})
    try{
           response.status(200).send({status:true,superadmin:superadmin})
    }
    catch(error){
              response.status(500).send(error)
    }
}