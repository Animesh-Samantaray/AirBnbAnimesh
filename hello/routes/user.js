const express = require('express');

const router = express.Router();

router.get('/user',(req,res)=>{
    res.send('<h1> user home</h1>')
})

router.get('/anim',(req,res)=>{
    res.send('<h1> user anim</h1>')
})


module.exports=router;