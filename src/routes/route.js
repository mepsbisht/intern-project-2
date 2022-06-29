const express = require('express');
const router = express.Router();
const CollegeController=require("../controller/collegeController")
const InternController=require("../controller/internController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/functionup/colleges",CollegeController.createCollege)
router.post("/functionup/interns",InternController.createIntern)
router.get('/functionup/collegeDetails',CollegeController.getCollegeDetails)

module.exports=router;