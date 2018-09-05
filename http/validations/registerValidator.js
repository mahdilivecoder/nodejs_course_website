const validator=require('./validator');
const {check}=require('express-validator/check');
class registerValidator extends validator{
  handle(){
        return[
        check('name').not().isEmpty().withMessage('فیلد نام نمی تواند خالی باشد.')
        .isLength({min:5}).withMessage('فیلد نام نمی تواند کمتر از 5 گاراکتر باشد.'),
        check('email').isEmail().withMessage('فرمت ایمیل وارد شده صحیح نمی باشد.')
        .not().isEmpty().withMessage('فیلد ایمیل نمی تواند خالی باشد.'),
        check('password').not().isEmpty().withMessage('فیلد پسورد نمی تواند خالی باشد.')
        .isLength({min:8,max:20}).withMessage('پسورد باید بیشتر از 8 کاراکتر و کمتر از 20 کاراکتر باشد.')
        ]
    }

}
module.exports=new registerValidator();

