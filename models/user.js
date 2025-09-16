const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        required:true,
        type:String
    },
    username:{
        required:true,
        type:String
    }
}) ; 
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);