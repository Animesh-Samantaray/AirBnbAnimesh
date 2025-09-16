const mongoose=require('mongoose');
let initData=require('./data.js');
const Listing = require('../models/listing.js');

mongoose.connect('mongodb://127.0.0.1:27017/wonder').then(res=>console.log('connected again')).catch(err=>console.log(err));

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData)
    console.log(initData);
}

initDB();
