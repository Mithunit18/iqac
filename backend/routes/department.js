// routes/departmentRoutes.js
const express = require('express');
const {
  getAllDepartments,
  getDocumentsByDepartmentId,
} = require('../controllers/departmentController');

const router = express.Router();

// Route to get all departments
router.get('/departments', getAllDepartments);


// Route to get documents by department ID
router.get('/departments/:departmentId/documents', getDocumentsByDepartmentId);

module.exports = router;
