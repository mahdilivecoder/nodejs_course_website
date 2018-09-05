const express=require('express');
const router=express.Router();
const passport=require('passport');
//Controller
const loginController=require('./../../http/controllers/auth/loginController');
const registerController=require('./../../http/controllers/auth/registerController');


const registerValidator=require('./../../http/validations/registerValidator');
const loginValidator=require('./../../http/validations/loginValidator');

const resetValidator=require('./../../http/validations/resetValidator');
const resetPasswordValidator=require('./../../http/validations/resetPasswordValidator');

const forgotPasswordController=require('./../../http/controllers/auth/forgotPasswordController');
const resetPasswordController=require('./../../http/controllers/auth/resetPasswordController');
//auth route
router.get('/login',loginController.showLoginForm);
router.post('/login',loginValidator.handle(),loginController.loginProcess);

router.get('/register',registerController.showRegisterForm);
router.post('/register',registerValidator.handle(),registerController.registerProcess);

router.get('/password/reset',forgotPasswordController.showForgotPassword);
router.post('/password/reset',resetPasswordValidator.handle(),resetPasswordController.resetPasswordProcess);

router.post('/passwords/email',resetValidator.handle(),forgotPasswordController.sendPasswordResetLink);
router.get('/password/reset/:token',resetPasswordController.showResetPassword);


router.get('/google',  passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{successRedirect:'/',failureRedirect:'/register'}));


module.exports=router;