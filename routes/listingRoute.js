const express = require('express');
const router = express.Router();
const {isLoggedIn ,saveRedirectUrl } = require('../middleware.js');
const override = require('method-override');
const ejsMate = require('ejs-mate');
const Listing = require('../models/listing.js');
const Review = require('../models/reviews.js');
const ExpressError = require('../utils/ExpressError.js');
const flash = require('connect-flash');


router.get('/',async (req,res,next)=>{
 try{
 let listing =await Listing.find({});
 res.render('index.ejs',{listing});
 }
 catch(err){
    next(err);
 }
})


router.get('/new',isLoggedIn ,  (req,res)=>{
    res.render('new.ejs');
}); 

router.get('/:id',isLoggedIn,async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id).populate('reviews').populate('owner');
    console.log(list);
    
    res.render('show.ejs',{list});
})

router.post('/',isLoggedIn,saveRedirectUrl ,async (req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    if (!image || image.trim() === '') {
        image = 'https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design.jpg';
    }
      let n = new Listing({
        title,
        description,
        image,
        price,
        location,
        country
    });
    n.owner = req.user._id;
   await n.save()
  .then(() => res.redirect('/listing'))
  .catch(err => console.error('cant add data to db'));
});

router.get('/:id/edit',isLoggedIn, async(req,res,next)=>{
    try{
 let {id} = req.params;
    let list = await Listing.findById(id);
    res.render('edit.ejs',{list});
    }catch(err){
        next(err);
    }
       
})

router.put('/:id',isLoggedIn, async (req,res,next)=>{
    try{
 let {id}=req.params;
    let {title,description,image,price,location,country} = req.body;
     await Listing.findByIdAndUpdate(id,{title:title,
        description:description,
        image:image,
        price:price,
        location:location,
        country:country});
    res.redirect(`/listing/${id}`);
    }catch(err){
        next(err);
    }
   
})

router.use((err,req,res,next)=>{
    let {status , message} = err;
    // res.status(status).send(message);
    res.render('error.ejs',{err});
})


router.delete('/:id' ,isLoggedIn, async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listing');
})

router.post('/:id/review',isLoggedIn,async(req,res)=>{
    let l = await Listing.findById(req.params.id);
    let newReview =  new Review(req.body.review);

    l.reviews.push(newReview);
    
    await newReview.save();
     await l.save();
     res.redirect(`/listing/${req.params.id}`)
})

module.exports=router;