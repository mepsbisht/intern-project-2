const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const { isValidRequest, isValid, isValidUrl, isValidName } = require('../validator/validation')


const createCollege = async function(req, res){
    try {

        if (!isValidRequest(req.body)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Input" })
        }

        const { name, fullName, logoLink } = req.body;
        const collegecollege = {}

        if (name) {
            if (!isValidName(name)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid Name" })
            }
            const isDuplicate = await collegeModel.find({name: name })
            if (isDuplicate.length == 0) {
                collegecollege.name = name
            } else return res
                .status(400)
                .send({ status: false, message: `${name} name already exist` })
        }else return res
                .status(400)
                .send({ status: false, message: "college name is required" })


        if(fullName){
            if (!isValid(fullName)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid fullName" })
            }else{
                collegecollege.fullName = fullName
            } 
        }else return res
                .status(400)
                .send({ status: false, message: "fullName is required" })


        if(logoLink){
            if (!isValid(logoLink)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid logoLink url" })
            }
            if(!isValidUrl(logoLink)) {
                return res
                    .status(400)
                    .send({ status: false, message: "Enter a valid logoLink url format" })
            } else {
                collegecollege.logoLink = logoLink
            }
        }else return res
                .status(400)
                .send({ status: false, message: "logoLink is required" })

        
        const college = await collegeModel.create(collegecollege)
        return res
            .status(201)
            .send({ status: true, college: college })
    }
    catch (error) {
        return res
            .status(500)
            .send({ status: false, message: error.message })
    }
}


const collegeDetails = async function(req,res){
    try {
        if(!isValidRequest(req.query)){
            return res
                .status(400)
                .send({status:false, message:"Enter a valid query"})
        }
        
        let name = req.query.collegeName || req.query.collegename || req.query.COLLEGENAME
        name = name.toLowerCase()
        if(!isValid(name)){
            return res
                .status(400)
                .send({status:false, message:"Enter a valid query value"})
        }
        
        const college = await collegeModel.findOne({ name: name })

        if(!college){
            return res
                .status(404)
                .send({status:false, message:"No such college exist or try for abbreviation of same"})
        }
        const interns = await internModel.find({ collegeId: college._id })
        if(!interns){
            return res
                .status(404)
                .send({status:false, message:"No intern exist from this college"})
        }
        const data = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
        }
        return res
            .status(200)
            .send({ status: true, data })
    }
    catch(error){
        return res
                .status(500)
                .send({status:false, message:error.message})
    }
}


module.exports = { createCollege, collegeDetails}