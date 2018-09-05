const validator=require('./validator');
const {check}=require('express-validator/check');
class resetPasswordValidator extends validator{
  handle(){
        return[
            check('password').isLength({min:8,max:20}).withMessage('فیلد پسورد باید بین 8 تا 20 رقم باشد.'),
        ]
    }

}
module.exports=new resetPasswordValidator();

