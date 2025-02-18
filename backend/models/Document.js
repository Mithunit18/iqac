const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  documentName: { type: String, required: true },
  documentUrl: { type: String, required: true } // This URL points to the GridFS file download route
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Document', documentSchema);
