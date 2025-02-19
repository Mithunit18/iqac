const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  documentName: { type: String, required: true },
  emailId: { type: String, required: true },
  documentUrl: { type: String, required: true },
});

module.exports = mongoose.model("Faculty", FacultySchema);
