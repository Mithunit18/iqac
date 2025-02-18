const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');  // Adjust the path as necessary

// Set up storage destination and filename for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files are saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
  }
});

const upload = multer({ storage: storage });

// ------------------- Upload Document ------------------- //
const uploadDocument = async (req, res) => {
  const file = req.file;
  const { departmentName } = req.body;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Create a new document entry in MongoDB
    const newDocument = new Document({
      departmentName,
      documentName: file.originalname,
      documentUrl: `/uploads/${file.filename}` // Relative path to the file
    });

    await newDocument.save();
    res.status(200).send('File uploaded successfully and metadata saved');
  } catch (error) {
    console.error('Error saving metadata:', error);
    res.status(500).send('Error saving document metadata');
  }
};

// ------------------- Get All Documents ------------------- //
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find(); // Retrieve all document metadata

    if (!documents || documents.length === 0) {
      return res.status(404).send('No documents found');
    }

    res.status(200).json(documents); // Return list of documents with metadata
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error fetching documents');
  }
};

// ------------------- Get Documents by Department ------------------- //
const getDocumentsByDepartment = async (req, res) => {
  const departmentName = req.params.departmentName;
  try {
    // Fetch documents where departmentName matches the requested department
    const documents = await Document.find({ departmentName });

    if (!documents || documents.length === 0) {
      return res.status(404).send('No documents found for this department');
    }

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents by department:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ------------------- Download Document ------------------- //
const downloadDocument = async (req, res) => {
  const { filename } = req.params;

  try {
    const filePath = path.join(__dirname, "../uploads", filename);

    // Check if file exists before downloading
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } catch (error) {
    console.error('Error processing download request:', error);
    res.status(500).send('Error downloading file');
  }
};

// ------------------- Delete Document ------------------- //
const deleteDocument = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the document by ID
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).send('Document not found');
    }

    // Delete the file from the local filesystem
    const filePath = path.join(__dirname, "../", document.documentUrl);
    require('fs').unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });

    // Delete the metadata from MongoDB
    await Document.findByIdAndDelete(id);
    res.status(200).send('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Error deleting document');
  }
};

module.exports = {
  upload,
  uploadDocument,
  getDocuments,
  getDocumentsByDepartment,
  downloadDocument,
  deleteDocument
};
