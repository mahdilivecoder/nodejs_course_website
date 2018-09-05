
class adminController{
    index(req,res){
        res.json('Hello from Controller!');
    }
    courses(req,res){
        res.send('Courses');
    }
}

module.exports=new adminController();
