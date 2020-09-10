const mongoose = require("mongoose");
const StudentSchema = require("./schema_student");
const collection = `studentsV2`;

const Student = mongoose.model(collection, StudentSchema);

module.exports = Student;