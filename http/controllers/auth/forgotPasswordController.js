const controller=require('./../controller');
const passport=require('passport');
const {validationResult}=require('express-validator/check');
const PasswordReset=require('./../../../models/password-reset');
const User=require('./../../../models/user');
const uniqueString=require('unique-string');
class forgotPasswordController extends controller {
    showForgotPassword(req, res) {
        res.render('auth/passwords/email', {errors: req.flash('errors'), recaptcha: this.recaptcha.render()});
    }

    async sendPasswordResetLink(req, res, next) {
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req)
        if (result) {
            return this.sendResetLink(req, res)
        }
        return res.redirect('/auth/password/reset');

    }

    //sendResetLink process
    async sendResetLink(req, res, next) {
    let user=await User.findOne({email:req.body.email});
    if(!user){
        req.flash('errors','چنین کاربری وجود ندارد!.');
        return this.back(req,res);
    }
    const newPasswordReset=new PasswordReset({
        email:req.body.email,
        token:uniqueString()
    })
      await newPasswordReset.save();
        req.flash('success','ایمیل بازیابی رمز عبور با موفقیت فرستاده شد!.');
        //send email
        res.redirect('/');
    }

    async validationData(req){
        const result=validationResult(req);
        if(!result.isEmpty()){
            const errors=result.array();
            const message=[];
            errors.forEach(error=>message.push(error.msg));
            req.flash('errors',message);

            return false;
        }
        return true;
    }
}
module.exports=new forgotPasswordController();
