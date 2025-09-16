const express = require('express');
const mongoose = require('mongoose');
const review=require('./reviews.js');
const { ref } = require('joi');
const listingSchema = new mongoose.Schema({
    title:{
        type:String,required:true
    },
    description:{
        type:String,required:true
    },
    image:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmamatafertility.com%2Felements%2Fblog-elements%2Fpage%2F5%2F&psig=AOvVaw1IpcYoGlf2knAsStfUIa3j&ust=1753594383169000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNiO763m2Y4DFQAAAAAdAAAAABAL'
    },
    price:{
        type:Number,required:true
    },
    location:{
        type:String,required:true
    },
    country:{
        type:String,required:true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Listing = mongoose.model('Listing',listingSchema);
module.exports=Listing;