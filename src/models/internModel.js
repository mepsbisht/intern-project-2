const mongoose = require('mongoose')
const objectId =  mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name:{
        required:'name is required',
        type:String
    },
    email:{
        required:'email is required',
        type:String,
        unique: true,
        lowercase: true
    },
    mobile:{
        required:'mobile number is required',
        type: String,
        unique:true
    },
    collegeId:{
        type: objectId,
        ref: 'college'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('intern' , internSchema)