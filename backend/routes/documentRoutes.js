const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const { 
  uploadDocument, 
  getDocuments, 
  getDocumentsByDepartment,  // New controller for filtering by department
  downloadDocument 
} = require('../controllers/documentController');

// Route for uploading documents
router.post('/upload', upload.single('document'), uploadDocument); 

// Route to fetch all documents metadata
router.get('/documents', getDocuments); 

// Route to fetch documents by department
router.get('/documents/:departmentName', getDocumentsByDepartment); // Filter by department

// Route for downloading a document from GridFS
router.get('/document/:filename', downloadDocument); 

module.exports = router;
