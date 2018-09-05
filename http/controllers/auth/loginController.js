const controller=require('./../controller');
const passport=require('passport');
const {validationResult}=require('express-validator/check');

class loginController extends controller{
    showLoginForm(req,res){
        res.render('auth/login',{errors:req.flash('errors'),recaptcha:this.recaptcha.render()});
    }
    async loginProcess(req,res,next) {

        await this.recaptchaValidation(req,res);
            let result=await this.validationData(req);
            if(result)
            {
                return this.login(req,res,next);
            }
            return res.redirect('/auth/login');
        }

    //login process
    login(req,res,next){
        passport.authenticate('local.login',(err,user)=>{
            if(!user){
                return res.redirect('/auth/login');
            }
            req.login(user,err=>{
                if(req.body.remember){
                    user.setRememberToken(res);
                }
                return res.redirect('/');
            })
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
module.exports=new loginController();
