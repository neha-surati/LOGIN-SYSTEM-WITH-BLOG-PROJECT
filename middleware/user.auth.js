const blogDB = require("../models/blog.schema");
const user = require("../models/user.schema");

const localStartegy = require("passport-local").Strategy;
const userAuth = (req,res,next) =>{

    const {username, email, password, phone} = req.body;

    if(username && email && password && phone){
        next();
    }else{
        res.send("invalid data");
    }

}

const localAuth = (passport) => {
    passport.use(
      new localStartegy(async (username, password, done) => {
        console.log(username, password);
        try {
          let User = await user.findOne({ username: username });
          console.log("local auth", User);
          if (!User) return done(null, false);
          if (User.password != password) return done(null, false);
          return done(null, User);
        } catch (error) {
          console.log(error);
        }
      })
    );
    passport.serializeUser((User, done) => {
      return done(null, User.id);
    });
    passport.deserializeUser(async (id, done) => {
      const User = await user.findById(id);
  
      return done(null, User);
    });
  };

const isAuth = (req,res,next)=>{
    // let {user} = req.cookies; 

    if(req.user){
      return  next();
    }else{
        return res.redirect('/login');
    }
}

module.exports = {userAuth, isAuth,localAuth };