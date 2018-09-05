const controller=require('./../controller');
const passport=require('passport');
const {validationResult}=require('express-validator/check');
const PasswordReset=require('./../../../models/password-reset');
const User=require('./../../../models/user');
const uniqueString=require('unique-string');
class resetPasswordController extends controller {
    showResetPassword(req, res) {
        res.render('auth/passwords/reset', {errors: req.flash('errors'), recaptcha: this.recaptcha.render(),token:req.params.token});
    }

    async resetPasswordProcess(req, res, next) {
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req)
        if (result) {
            return this.sendResetPassword(req, res)
        }
        return res.redirect('/auth/password/reset/'+req.body.token);

    }

    //sendResetLink process
    async sendResetPassword(req, res) {
    let field=await PasswordReset.findOne({$and:[{email:req.body.email},{token:req.body.token}]})
    if(!field){
        req.flash('errors','اطالاعات وارد شده صحیح نمی باشد!.');
        return this.back(req,res);
    }
    if(!field.use){
        req.flash('errors','از این لینک قبلاٌ برای بازیابی استفاده شده است.');
        return this.back(req,res);
    }
    let user=await User.findOneAndUpdate({email:field.email},{$set:{password:req.body.password}})
        if(!user){
        req.flash('errors','آپدیت شدن انجام نشد!.');
        return this.back(req,res);
        }
        await field.update({use:true});
        return res.redirect('/auth/login');
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
module.exports=new resetPasswordController();
