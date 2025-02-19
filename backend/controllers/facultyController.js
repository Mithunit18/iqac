const bcrypt = require("bcryptjs");
const FacultyAuthentication = require("../models/FacultyDB"); // Correct model import
const Faculty = require("../models/Faculty");
const multer = require("multer");

const getFacultyAuth = async (req, res) => {
  const { departmentName, name, emailId, password } = req.body;

  try {
    // Check if faculty exists
    const faculty = await FacultyAuthentication.findOne({ departmentName, name, emailId });

    if (!faculty) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Send success response
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
const uploadSingle = upload.single("file");

// 📌 Upload Document Function
const uploadDocument = async (req, res) => {
  const { emailId, departmentName } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const documentName = req.file.originalname; // Get file name
    const documentUrl = req.file.path; // Get file path

    const newFacultyDocument = new Faculty({
      documentName,
      documentUrl,
      departmentName,
      emailId
    });

    await newFacultyDocument.save();
    res.status(200).json({ message: "Document uploaded successfully", document: newFacultyDocument });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Error uploading document" });
  }
};

// 📌 Get Documents Function
const getDocuments = async (req, res) => {
  const { emailId } = req.params;
  
  try {
    const facultyDocuments = await Faculty.find({ emailId });

    if (facultyDocuments.length === 0) {
      return res.status(200).json([]); // Return empty array instead of error
    }

    res.status(200).json(facultyDocuments);
  } catch (error) {
    console.error("Error fetching faculty documents:", error);
    res.status(500).json({ error: "Error fetching faculty documents" });
  }
};


module.exports = { getFacultyAuth, 
  uploadSingle,
  uploadDocument,
  getDocuments
};
