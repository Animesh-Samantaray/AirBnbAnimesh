const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const port = 8080;
const app = express();
const Listing = require('./models/listing.js');
const override = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const Review = require('./models/reviews.js')
mongoose.connect('mongodb://127.0.0.1:27017/wonder').then(res=>console.log('connected db')).catch(err=>console.log('cant conect'));
const listingRoute = require('./routes/listingRoute.js');
const userRoute = require('./routes/user.js');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(override('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));
app.use(flash());
const sessionOptions={
    secret:'AnimeshIsStudyingCS',
    resave:false,
    saveUninitialized:true,
    cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    maxAge: 7 * 24 * 60 * 60 * 1000
}

}
app.use(session(sessionOptions));
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.currUser = req.user || null;
    next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());









app.listen(port , (req,res)=>{
    console.log('http://localhost:8080/listing');
});
app.use('/listing',listingRoute);
app.use('/user',userRoute);
app.get('/',(req,res)=>{
    res.send('Hi I am Animesh');
});
 
app.get('/demouser',async(req,res)=>{
    let fakeUser = new User({
        email:'Animesh@gmail.com',
        username:'Animesh Sam 18'
    });

    const now = await User.register(fakeUser,'ani');
    res.send(now);
})