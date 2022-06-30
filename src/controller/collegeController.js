const CollegeModel = require('../models/collegeModel')
const Validator = require('../validator/validator')
const InternModel=require('../models/internModel')




const createCollege = async function (req, res) {
    try {
        const requestbody = req.body
        // validation stat
        // to check body data 
        if (!Validator.isValidRequestBody(requestbody)) {
            return res.status(400).send({
                status: false,
                msg: "Please enter the data "
            });
        }
        const { name, fullName, logoLink, } = requestbody
        // to check name
        if (!Validator.isValid(name)) {
            return res.status(400).send({
                status: false,
                msg: "Please enter the name "
            })
        }
        // to check the fullName
        if (!Validator.isValid(fullName)) {
            return res.status(400).send({
                status: false,
                msg: "Please enter full name"
            })
        }
        // to check the logo link
        if(!Validator.isValid(logoLink)){
            return res.status(400).send({
                status:false,
                msg: "Please enter logo link" 
            })
        }
        // to check the logo link is valid or not 
        if(!Validator.isValidUrl(logoLink)){
            return res.status(400).send({
                status:false,
                msg:"Please enter valid logo link"
            })
        }
        // tto check the valid image url 
        if(!Validator.isValidImageUrl(logoLink)){
            return res.status(400).send({
                status:false,
                msg:'Please enter valid image url'
            })
        }
        // to check the duplicate college 
        const isduplicate=await CollegeModel.find({name:name})
        if(isduplicate.length!=0){
            return res.status(400).send({
                status:false,
                msg:`${name} is already exist`
            })
        }
        // validation ends

        // to create new college 
        const newCollege = await CollegeModel.create(requestbody)
        res.status(201).send({
            status: true,
            data: newCollege
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}



const getCollegeDetails=async function(req,res){

    try{
        const data=req.query
        // to check the input data in query
        if(Object.keys(data)==0) {
            return res.status(400).send({
                status:false,
                msg:'Please enter the college name in query'
            })
        }
        // to update the college name in lowercase 
        collegeName=Validator.isValidCase(data.collegeName)
        // to get the dtails of college
        const collegedetails=await CollegeModel.findOne({name:collegeName,isDeleted:false}).select({name:1,fullName:1,logoLink:1})
        if(!collegedetails) {
            return res.status(400).send({
                status:false,
                msg:'No such college found'
            })
        }
        // to get the details of intern present in that college
        const internDetails=await InternModel.find({collegeId:collegedetails._id, isDeleted:false}).select({_id:1,name:1,email:1,mobile:1})
        if(!internDetails){
            return res.status(400).send({
                status:false,
                msg:'No intern is presnt in the college'
            })
        }
        const result={
            name:collegedetails.name,
            fullName:collegedetails.fullName,
            logoLink:collegedetails.logoLink,
            interns:internDetails
        };
        return res.status(200).send({
            data:result
        })
        
    }catch(err){
        res.status(500).send({
            status:false,
            msg: err.message
        })
    }
}

module.exports = { createCollege,getCollegeDetails }
