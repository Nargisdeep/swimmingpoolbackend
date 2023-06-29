const nodemailer = require('nodemailer');
var express = require('express');
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
let mailOptions = {
    from:'nargisdeepkaur@gmail.com',
    to: 'nargisdeepkaur46@gmail.com',
    subject: `Welcome to GoSwim Hello Mn`,
    html:comtemplate.render({adminname:"hello"})
  };
  console.log(mailOptions)

  exports.sendMail=async(resquest,response)=>{
    mailTransporter.sendMail(mailOptions, function(err, data) {
        if(err) {
          console.log('Error Occurs');
        } else {
          console.log('Email sent successfully');
        }
      })
    try{
              
     response.status(200).send({"message":"Helllo"})
        
    }
    catch(error){

       res.status(500).send(error)
    }

   
  
  }
  
  