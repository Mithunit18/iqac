// controllers/departmentController.js
const Department = require('../models/Dept');

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get documents by department ID
const getDocumentsByDepartmentId = async (req, res) => {
  const { departmentId } = req.params;
  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    // Assuming documents are stored in a 'documents' field
    res.status(200).json(department.documents || []);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllDepartments,
  getDocumentsByDepartmentId,
};
