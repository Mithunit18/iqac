const multer = require('multer');

// Set up Multer storage (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });  // Single file upload

module.exports = upload;
