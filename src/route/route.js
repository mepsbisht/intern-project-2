const express = require('express')
const router = express.Router()
const {createCollege, collegeDetails} = require('../controller/collegeController')
const {createIntern} = require('../controller/internController')
// const collegeModel = require('../models/collegeModel')



router.post('/functionUp/colleges', createCollege)
router.post('/functionUp/interns', createIntern)
router.get('/functionUp/collegeDetails', collegeDetails)

module.exports = router