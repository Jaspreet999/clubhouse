const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy


const indexRoutes = require('./routes/index')
const User = require('./model/user')

const mongoDb = "mongodb+srv://m-001-student:m001-mongodb@sandbox.zoqk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


const app = express()
//port numer
const port = process.env.PORT||3003


app.set("views",path.join(__dirname,"views"))
app.set("view engine","pug")
app.use(express.static(path.join(__dirname,"public")))

passport.use(
    new LocalStrategy((username,password,done)=>{
      
        User.findOne({username:username})
        .exec((err,result)=>{
            if(err) return done(err)

            if(result ==null){
                
                return done(null,false,{ message:"No user found"})
            }
            if(password != result.password){
                // Passwords match, log user in!
                return done(null,false,{message:"password not match"});
            };
            if(password == result.password){
                // Passwords match, log user in!
                return done(null, result);
            };
        })
    })
)

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    User.findById(user._id)
    .exec((err,user)=>{
        done(err,user)
    })
})

app.get("/logout", (req, res) => {
      req.user = ""
      res.redirect("/");
    
  });

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({
    extends:false
}))


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

app.use('/',indexRoutes)


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(port,(req,res)=>{
    console.log("server is working at "+ port)
})

module.exports = app