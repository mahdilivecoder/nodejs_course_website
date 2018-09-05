
class redirectifAuthenticated{
    handle(req , res ,next) {
        if( req.isAuthenticated()) return res.redirect('/');
        next();
    }


}

module.exports=new redirectifAuthenticated();