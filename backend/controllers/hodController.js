const multer = require("multer");
const Document = require("../models/Document");
const Faculty = require("../models/Faculty");
const path = require("path");
const fs = require("fs");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/**
 * Fetch documents from the Faculty collection by department
 */
const getDocumentsByDepartment = async (req, res) => {
  const { departmentName } = req.params;
  
  try {
    const facultyDocuments = await Faculty.find({ departmentName });

    if (facultyDocuments.length === 0) {
      return res.status(200).json([]); // Return empty array instead of error
    }

    res.status(200).json(facultyDocuments);
  } catch (error) {
    console.error("Error fetching faculty documents:", error);
    res.status(500).json({ error: "Error fetching faculty documents" });
  }
};


/**
 * Upload a document to the Document collection
 */
const uploadDocument = async (req, res) => {
  const { documentName, documentUrl, departmentName, classId } = req.body;

  if (!documentName || !documentUrl) {
    return res.status(400).json({ error: "Missing document details" });
  }

  try {
    const newDocument = new Document({
      documentName,
      documentUrl,
      departmentName,
      classId,
    });
    await newDocument.save();
    res.status(200).json({ message: "Document uploaded successfully" });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Error uploading document" });
  }
};


/**
 * Download a document by filename
 */
const downloadDocument = async (req, res) => {
  const { filename } = req.params;

  try {
    const filePath = path.join(__dirname, "../uploads", filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Set headers for download
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/octet-stream");

    res.download(filePath);
  } catch (error) {
    console.error("Error processing download request:", error);
    res.status(500).json({ error: "Error downloading file" });
  }
};

module.exports = {
  upload,
  uploadDocument,
  getDocumentsByDepartment,
  downloadDocument,
};
