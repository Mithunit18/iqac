const multer = require('multer');
const { getGridFS } = require('../models/gridFS');
const Document = require('../models/Document');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

// Initialize multer for handling file uploads
const upload = multer({ storage: storage });

// Get documents for a specific department
const getDocumentsByDepartment = async (req, res) => {
  const { departmentName } = req.params;
  try {
    const documents = await Document.find({ departmentName });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error fetching documents');
  }
};

// Get documents by class and department
const getDocumentsByClass = async (req, res) => {
  const { departmentName, classId } = req.params;
  try {
    const documents = await Document.find({ departmentName, classId });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents by class:', error);
    res.status(500).send('Error fetching documents by class');
  }
};

// Upload a document for a class and department
const uploadDocument = async (req, res) => {
  const file = req.file;
  const { departmentName, classId } = req.body; // Class-specific upload

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const gfs = getGridFS();
    const uploadStream = gfs.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);

    uploadStream.on('finish', async () => {
      const newDocument = new Document({
        departmentName,
        classId, // Save the classId along with departmentName
        documentName: file.originalname,
        documentUrl: `/api/document/${uploadStream.filename}` // URL to access the document
      });
      await newDocument.save();
      res.status(200).send('File uploaded successfully');
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).send('Error uploading document');
  }
};

// Download document by filename
const downloadDocument = async (req, res) => {
  const { filename } = req.params;
  try {
    const gfs = getGridFS();
    const file = await gfs.find({ filename }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).send('File not found');
    }
    const readStream = gfs.openDownloadStreamByName(filename);
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    readStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Error downloading file');
  }
};

// Exporting the controller functions and multer upload
module.exports = {
  upload,  // Multer upload configuration
  uploadDocument,
  getDocumentsByDepartment,
  getDocumentsByClass,
  downloadDocument
};