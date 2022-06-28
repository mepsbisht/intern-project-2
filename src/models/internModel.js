const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId


const internSchema= new mongoose.Schema({

    name:{
        type:String,
        required: 'Please enter Intern name',
        trime:true
    },
    email:{
        type:String,
        required:'Please enter email address',
        unique:true,
        trim:true,
    },
    mobile:{
        number:Number,
        unique:true,
        required:'Please enter mobile number',
        trim:true
    },
    collegeId:{
        type:ObjectId,
        ref:'College'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.Model('Intern',internSchema)