const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure department names are unique
  },
  fileUploaded: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Department', DepartmentSchema);