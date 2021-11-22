const mongoose = require('mongoose')
const {Schema} = mongoose;

const studentSchema = new Schema({

    name : String,
    age : Number,
    course : String,
    email : String

})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student