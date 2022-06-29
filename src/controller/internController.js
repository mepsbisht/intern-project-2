const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const {isValidRequest, isValidName, isValidMail, isValidMobile} = require('../validator/validation')


const createIntern = async function(req, res){
    try{

        if (!isValidRequest(req.body)) {
            return res
                .status(400)
                .send({ status: false, message: "Enter a valid Input" })
        }

        const {name, email, mobile, collegeName}= req.body
        const internData = {};
        if(name){
            if(!isValidName(name)){
                return res
                    .status(400)
                    .send({status:false, message:"Enter a valid name"})
            }else{
                internData.name = name
            }
        }else return res
                .status(400)
                .send({status:false, message:"Name is required"})

        if(email){
            if(!isValidMail(email))
                return res
                .status(400)
                .send({status:false, message:"Enter a valid email"})
        }else return res
                .status(400)
                .send({status:false, message:"email is required"})
        

        if(mobile){
            if(!isValidMobile(mobile))
                return res
                .status(400)
                .send({status:false, message:"Enter a valid mobile number"})
            
        }else return res
            .status(400)
            .send({status:false, message:"Mobile number is required"})

        const isDuplicate = await internModel.findOne({$or:[{email:email} , {mobile:mobile}]})
        if(isDuplicate){
            return res
            .status(400)
            .send({status:false, message:"email or mobile number is already in use"})
        }else{
             internData.email = email;
             internData.mobile = mobile;
        }

        if(collegeName){
            if(!isValidName(collegeName)){
                return res
                .status(400)
                .send({status:false, message:"Enter a Valid college name"})
            }else{
                const college = await collegeModel.findOne({name: collegeName})
                if(college){
                    internData.collegeId = college._id
                }else{
                    return res
                    .status(404)
                    .send({status:false, message:"No such college exists"})
                }
            }
        }else return res
            .status(400)
            .send({status:false, message:"collegeName is required"})
        
        const intern = await internModel.create(internData)
        return res
                .status(201)
                .send({status:true, data: intern})
    }


    catch(error){
        return res
            .status(500)
            .send({status: false, message: error.message})
    }
}


module.exports = {createIntern}
