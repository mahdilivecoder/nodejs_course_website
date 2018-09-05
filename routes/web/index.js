const express=require('express');
const router=express.Router();


//Admin Router
const adminRouter=require('./admin');
router.use('/admin',adminRouter);

//Home Router
const homeRouter=require('./home');
router.use('/',homeRouter);


const redirectifAuthenticated=require('./../../http/middleware/redirectifAuthenticated');

const authRoute=require('./auth');
router.use('/auth',redirectifAuthenticated.handle,authRoute);

module.exports=router;
