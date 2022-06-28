const express = require('express');
const router = express.Router();
const CollegeController=require("../controller/collegeController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




module.exports=router;