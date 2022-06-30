const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel');
const Validator = require('../validator/validator')



const createIntern = async function (req, res) {
    try {
        const requestbody = req.body;
        // validation starts
        // to check input in request body
        if (!Validator.isValidRequestBody(requestbody)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter details of intern'
            })
        }
        const { name, email, mobile, collegeName } = requestbody
        // to check name 
        if (!Validator.isValid(name)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter the intern name'
            })
        }
        // to check email 
        if (!Validator.isValid(email)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter the email of intern'
            })
        }
        // to check email is valid
        if (!Validator.isValidEmail(email)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter the valid email'
            })
        }
        // to check duplicate email id 
        const isduplicateEmailid = await InternModel.find({ email: email })
        if (isduplicateEmailid.length != 0) {
            return res.status(400).send({
                status: false,
                msg: `${email} is already in use`
            })
        }
        // to check the mobile number
        if (!Validator.isValid(mobile)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter the mobile number'
            })
        }
        // to check the mobile no is valid or not 
        if (!Validator.isValidMobileNumber(mobile)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter valid mobile number'
            })
        }
        // to check duplicate mobile no 
        const isduplicateMobile = await InternModel.find({ mobile: mobile })
        if (isduplicateMobile != 0) {
            return res.status(400).send({
                status: false,
                msg: `${mobile} number is already used`
            })
        }
        // to check collegeName
        if (!Validator.isValid(collegeName)) {
            return res.status(400).send({
                status: false,
                msg: 'Please enter College Name'
            })
        }
        // to update the college name in lowercase
        const collegename = Validator.isValidCase(requestbody.collegeName)

        // to find the college name 
        const findCollege = await CollegeModel.findOne({ name: collegename })
        if (!findCollege) {
            return res.status(400).send({
                status: false,
                msg: "Please enter valid college name"
            })
        }
        // to check college is in running process
        if (findCollege.isDeleted == true) {
            return res.status(400).send({
                status: false,
                msg: "Please enter valid college/this college is deleted "
            })
        }
        const collegeId = findCollege._id
        const newInt = { name, mobile, email, collegeId }
        // creating a new intern
        const newIntern = await InternModel.create(newInt)
        return res.status(201).send({
            status: true,
            data: newIntern
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }

}

module.exports = { createIntern }