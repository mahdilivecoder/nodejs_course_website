const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('mongoose');
module.exports={
    secret:process.env.SESSION_SECRETKEY,
    resave:true,
    cookie:{expires:new Date(Date.now()+60000)},
    saveUninitialized:true,
    store:new MongoStore({mongooseConnection:mongoose.connection})

}