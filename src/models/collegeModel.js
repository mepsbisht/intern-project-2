const mongoose = require('mongoose')
// const url = mongoose.Schema.Types.Url

const collegeSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String
    },
    fullName: {
        required: true,
        type: String
    },
    logoLink: {
        required: true,
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("college", collegeSchema)