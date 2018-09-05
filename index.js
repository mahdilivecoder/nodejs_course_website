const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const http=require('http');
const cookieParser=require('cookie-parser');
const validator=require('express-validator');
const session=require('express-session');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const passport=require('passport');
const helpers=require('./helpers');
const expressLayout=require('express-ejs-layouts');
const rememberLogin=require('./http/middleware/rememberLogin');
module.exports=class Application{
    constructor(){

     this.setupExpress();
     this.setMongoConnection();
     this.setConfig();
     this.setRouters();

    }
    setupExpress(){
        const server=http.createServer(app);
        server.listen(config.port,()=>{
            console.log(`App Runnig on port ${config.port}`);
        })
    }

    setMongoConnection(){
        mongoose.Promise=global.Promise;
        mongoose.connect(config.database.url);

    }

    setConfig(){
        require('./passport/passport-local');
        require('./passport/passport-google');
        app.use(express.static(config.layout.public_dir));
        app.set('view engine',config.layout.view_engine);
        app.set('views',config.layout.view_dir);
        app.use(expressLayout);
        app.set('layout extractScripts',true);
        app.set('layout extractStyles',true);



        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(validator());

        app.use(session({...config.session}));
        app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        app.use(flash());
        //passport.js
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);
        app.use((req,res,next)=>{
          app.locals=new helpers(req,res).getObjects();
            next();
        })

    }
    setRouters(){
       app.use(require('./routes/web'));
       app.use(require('./routes/api'));

    }

}