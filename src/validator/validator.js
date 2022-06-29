const mongoose = require('mongoose')
const validator=require('validator')
const ObjectId=mongoose.Types.ObjectId()


const isValidRequestBody = function (value) {
    return Object.keys(value).length > 0
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === 'null') return false
    if(typeof value === 'string'&& value.trim().length === 0) return false
    return true
}

const isValidObjectId=function(collegeId){
    return ObjectId.isValid(collegeId)
}

const isValidUrl=function(value){
    let checkUrl = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
    if(checkUrl.test(value)){
        return true;
    }
    return false;
}

const isValidEmail= function(email){
    let checkemail=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if(checkemail.test(email)){
        return true;
    }
     return false;
}

const isValidMobileNumber=function(mobile){
    let checkMobile= /^(\+\d{1,3}[- ]?)?\d{10}$/
    if(checkMobile.test(mobile)){
        return true;
    }
    return false;
}

const isValidCase=function(value){
    if (value.toLowerCase()===value){
        return true;
    }   
    return false;
}


module.exports={isValid,isValidEmail,isValidMobileNumber,isValidObjectId,isValidRequestBody,isValidUrl,isValidCase}