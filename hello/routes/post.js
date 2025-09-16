const express = require('express');

const router = express.Router();

router.get('/post',(req,res)=>{
    res.send('<h1> post home</h1>')
})

router.get('/anim',(req,res)=>{
    res.send('<h1> post anim</h1>')
})


module.exports=router;