const mongoose = require('mongoose')

const collegeSchema= new mongoose.Schema({

    name:{
        type: String,
        required:'Please enter name ',
        unique:true,
        trim:true
    },
    fullName:{
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

});

module.exports=mongoose.model('College',collegeSchema)