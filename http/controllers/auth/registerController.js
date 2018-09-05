const controller=require('./../controller');
const passport=require('passport');
const {validationResult}=require('express-validator/check');


class registerController extends controller{
    showRegisterForm(req,res){
         res.render('auth/registers',{errors:req.flash('errors'),recaptcha:this.recaptcha.render()});

    }
    async registerProcess(req,res,next) {
        await this.recaptchaValidation(req, res);
        let result=await this.validationData(req,res);
                if(result)
                {
                    return this.register(req,res,next);
                }
                    return res.redirect('/auth/register');
    }

        register(req,res,next){
            passport.authenticate('local.register',{
                successRedirect:'/',
                failureRedirect:'/auth/register',
                failureFlash:true
            })(req,res,next)
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
module.exports=new registerController();
