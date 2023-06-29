var express = require('express');
var router = express.Router();
const admin_controller=require('../controller/admin_routes')
const superadmin_controller=require('../controller/superadmin_routes')
const signin_controller=require('../controller/signin_routes')
const member_controller=require('../controller/member_routes')
const authenticated=require('../middleware/auth_middleware')
const authorizedAdmin=require('../middleware/authadmin_middleware')
const authorizeSuperAdmin=require('../middleware/authsuperad_middleware')
const sendmail=require('../mailer/mailer')

//Requests for Admin Registration
router.post("/adminpost",admin_controller.adminPost)
router.get('/adminget',authenticated,authorizeSuperAdmin,admin_controller.adminGet)
router.get('/admingetbyid/:id',authenticated,admin_controller.adminGetByID)
router.delete('/admindelete/:id',admin_controller.adminDelete)
router.put('/adminput/:id',admin_controller.adminPut)
router.get('/admingetall',authorizeSuperAdmin,authenticated,admin_controller.adminGetAll)
router.post('/superadminpost',superadmin_controller.superadminPost)
router.post('/signin',signin_controller.SignIn)
router.get('/getsuperadmin',superadmin_controller.superadminGet)
router.put('/changeadmin/:id',admin_controller.adminChange)
router.post('/verifypassword/:id',admin_controller.verifyPassword)
router.patch('/changepassword/:id',admin_controller.changePassword)
//Request for Member Registration
router.post('/registermember',member_controller.memberPost)
router.get('/getmember/:id',authenticated,authorizedAdmin,member_controller.memberGet)
router.get('/getmemberdashboard/:id',authenticated,authorizedAdmin,member_controller.memberGetDashboard)
router.delete('/deletemember/:id',member_controller.memberDelete)
router.get('/getmemberbyId/:id',authenticated,member_controller.memberGetByID)
router.put('/editmember/:id',member_controller.memberPut)
router.get('/sendmail',sendmail.sendMail)
router.patch('/patchendtime/:id',member_controller.patchEndTime)
module.exports = router;
