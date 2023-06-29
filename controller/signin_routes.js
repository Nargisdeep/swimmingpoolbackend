var express = require('express');
const adminModel=require('../model/admin')
const  ObjectID = require('mongodb').ObjectId;
const superadminModel=require('../model/superadmin')
const tokenModel=require('../model/token')
var jwt=require('jsonwebtoken');

exports.SignIn=async(request,response) =>{
    
    const email=request.body.email
    const password=request.body.password
    console.log("hello")
    console.log(email)
    console.log(password)
  
    try{
      const logger= await superadminModel.findOne({"email":email})  
      const logger2= await adminModel.findOne({"adminemail":email})
      console.log(logger2)
      if(!(logger || logger2)){
       
       return response.status(422).send({"message":"Either Email or Password is Invalid"})
      }
      if(logger){
        
        if(logger.password==password){
          var token=jwt.sign({id:logger._id,role:logger.role},"hybfuqvqbqiuqhuhtger",{
            expiresIn:86400
          })
          
          var to_ken=new tokenModel({token})
          await to_ken.save()
          return response.status(200).json({"_id":logger._id,
                                           "name":logger.name,
                                           "image":logger.image,
                                           "email":logger.email,
                                           "role":logger.role,
                                           "token":token})
        }
        else{
          return response.status(422).send({"message":"Either Email or Password is Invalideeeeee"})
        }
      }
      if(logger2){
        console.log('hello')
        if(logger2.adminpassword==password && logger2.active==true){

          var token=jwt.sign({id:logger2._id,role:logger2.role},"hybfuqvqbqiuqhuhtger",{
            expiresIn:86400
          })
          
          var to_ken=new tokenModel({token})
          await to_ken.save()
          return response.status(200).json({"_id":logger2._id,
                                            "name":logger2.adminname,
                                            "image":logger2.adminimage,
                                           "email":logger2.adminemail,
                                           "username":logger2.adminusername,
                                           "hourlyrate":logger2.poolhourlyrate,
                                           "role":logger2.role,
                                           "token":token})
  
        }
        else{
          return response.status(422).send({"message":"Either Email,Password is Invalid or You are a Inactive admin"})
        }

      }
     
      else{
        return response.status(422).send({"message":"Either Email or Password is Invalideeeeee"})
      }
        
    }
    catch(error){
      console.log(error)
      return response.status(500).json(error)
        
    }
  }