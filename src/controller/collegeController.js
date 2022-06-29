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
        if(!data) {
            return res.status(400).send({
                status:false,
                msg:'Please enter the college name in query'
            })
        }
        // to check the college name lowercase
        if(!Validator.isValidCase(data.name)){
            return res.status(400).send({
               status:false,
               msg: "Please enter college name in lowercase only "
           })
       }
        // to get the dtails of college
        const collegedetails=await CollegeModel.findOne({name:data.name,isDeleted:false}).select({name:1,fullName:1,logoLink:1})
        if(!collegedetails) {
            return res.status(400).send({
                status:false,
                msg:'No such college found'
            })
        }
        // to get the details of intern present in that college
        const internDetails=await InternModel.find({collegeId:collegedetails._id}).select({_id:1,name:1,email:1,mobile:1})
        if(!internDetails){
            return res.status(400).send({
                status:false,
                msg:'No intern is presnt in the college'
            })
        }
        const foundDetails= {...collegedetails.toObject(),interns:internDetails}
        return res.status(200).send({
            data:foundDetails
        })
        
    }catch(err){
        res.status(500).send({
            status:false,
            msg: err.message
        })
    }
}

module.exports = { createCollege,getCollegeDetails }
