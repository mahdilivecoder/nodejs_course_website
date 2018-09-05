const express=require('express');
const router=express.Router();


//Admin controller
const adminController=require('./../../http/controllers/admin/adminController');


//Admin Route
router.get('/',adminController.index);
router.get('/courses',adminController.courses);



module.exports=router;
