const validator=require('./validator');
const {check}=require('express-validator/check');
class resetValidator extends validator{
  handle(){
        return[
            check('email').not().isEmpty().withMessage('فیلد ایمیل نمی تواند خالی باشد.'),
        ]
    }

}
module.exports=new resetValidator();

