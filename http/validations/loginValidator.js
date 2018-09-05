const validator=require('./validator');
const {check}=require('express-validator/check');
class loginValidator extends validator{
  handle(){
        return[
            check('email').not().isEmpty().withMessage('فیلد ایمیل نمی تواند خالی باشد.'),
            check('password').isLength({min:8,max:20}).withMessage('پسورد باید بیشتر از 8 کاراکتر و کمتر از 20 کاراکتر باشد.')
        ]
    }

}
module.exports=new loginValidator();

