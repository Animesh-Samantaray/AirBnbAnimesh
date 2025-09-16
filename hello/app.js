const express=require('express');
const mongoose = require('mongoose');
const user = require('./routes/user.js');
const post = require('./routes/post.js');
const cookieParser = require('cookie-parser');
const app=express();

const session = require('express-session')
// app.use('/user',user);
// app.use('/post',post);
// app.use(cookieParser('animesh'));
app.use(session({secret:'AnimeshIsHero' , resave:false , saveUninitialized:true}))
app.listen(2000,(req,res)=>{
console.log('http://localhost:2000/');
});

// app.get('/',(req,res)=>{
//     console.log(req.cookies);
//     res.send('<h1>HOME PAGE >>>>></h1>')
// });

app.get('/test',(req,res)=>{
    console.log(req.cookies);
    res.send('<h1>Test Done</h1>')
});

// app.get('/getCookies',(req,res)=>{
//     res.cookie('year',2025);
//     res.send('cookie sent');
// });

// app.get('/getSignedCookies',(req,res)=>{
//     res.cookie('Name','Animesh',{signed:true});
//     res.send('signed cookie');
// });

// app.get('/verify' , (req,res)=>{
//     res.send(req.signedCookies)
// })
// app.get('/greet',(req,res)=>{
//     let {Class} = req.cookies;
//     res.send(Class);
// });
