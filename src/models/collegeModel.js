const mongoose = require('mongoose')

const collegeSchema= new mongoose.Schema({

    name:{
        type: String,
        required:'Please enter name ',
        unique:true,
        trim:true
    },
    fullname:{
        type:String,
        required:'Please enter fullname '
    },
    logoLink:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

module.exports=mongoose.model('College',collegeSchema)