const express = require('express');
const router = express.Router();
const hodController = require('../controllers/hodController');

// Upload a document
router.post('/upload', hodController.upload.single('document'), hodController.uploadDocument);

// Get all documents
router.get('/documents', hodController.getDocumentsByDepartment);

// Get documents by department
router.get('/documents/department/:departmentName', hodController.getDocumentsByDepartment);

// Get documents by class and department
router.get('/documents/class/:departmentName/:classId', hodController.getDocumentsByClass);

// Download a document
router.get('/document/:filename', hodController.downloadDocument);

module.exports = router;