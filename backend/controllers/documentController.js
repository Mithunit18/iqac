const { getGridFS } = require('../models/gridFS');
const Document = require('../models/Document');  // Adjusted path to the model

// File upload endpoint using GridFS
const uploadDocument = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  // Initialize GridFS for file storage
  const gfs = getGridFS();

  // Create a stream for uploading the file
  const uploadStream = gfs.openUploadStream(file.originalname); // File name as metadata
  uploadStream.end(file.buffer);  // End the stream with the file buffer

  uploadStream.on('finish', async () => {
    try {
      // Create a new document metadata record in MongoDB
      const newDocument = new Document({
        departmentName: req.body.departmentName,  // Ensure department is sent in the form body
        documentName: file.originalname,          // File name stored in metadata
        documentUrl: `/api/document/${uploadStream.filename}` // URL to access the file
      });

      // Save document metadata to MongoDB
      await newDocument.save();
      res.status(200).send('File uploaded successfully and metadata saved');
    } catch (error) {
      console.error('Error saving metadata:', error);
      res.status(500).send('Error saving document metadata');
    }
  });

  // Error handling for the upload process
  uploadStream.on('error', (err) => {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file');
  });
};

// Fetch all documents metadata
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();  // Retrieve all document metadata

    if (!documents || documents.length === 0) {
      return res.status(404).send('No documents found');
    }

    res.status(200).json(documents);  // Return list of documents with metadata
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error fetching documents');
  }
};

// Get documents by department name
const getDocumentsByDepartment = async (req, res) => {
  const departmentName = req.params.departmentName;
  try {
    // Fetch documents where departmentName matches the requested department
    const documents = await Document.find({ departmentName });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents by department:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Download document from GridFS
// Download document from GridFS
const downloadDocument = async (req, res) => {
  const { filename } = req.params;  // Get filename from URL parameter

  try {
    const gfs = getGridFS();
    // Search for the file in GridFS
    const file = await gfs.find({ filename }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).send('File not found');
    }

    // Open the file for downloading using the filename
    const readStream = gfs.openDownloadStreamByName(filename);
    res.set('Content-Type', 'application/octet-stream');  // Set appropriate content type
    res.set('Content-Disposition', `attachment; filename="${filename}"`); // Trigger download
    readStream.pipe(res);  // Pipe the file stream to the response
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Error downloading file');
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentsByDepartment,  // Export the new controller
  downloadDocument
};
