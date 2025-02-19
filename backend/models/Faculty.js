const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    departmentName: { type: String, required: true },
    classId: { type: String, required: true },
    section: { type: String, required: true },
    documentName: { type: String, required: true },
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to GridFS file in 'faculty' bucket
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", FacultySchema);
