// models/gridFS.js
const { MongoClient, GridFSBucket } = require('mongodb');
let gfs;

// MongoDB URI (ensure this is correct)
const uri = process.env.MONGO_URI; // Use the environment variable for connection string

// Initialize GridFSBucket connection
const initGridFS = async (db) => {
  if (db) {
    gfs = new GridFSBucket(db, {
      bucketName: 'documents',  // GridFS bucket name for storing files
    });
    console.log('GridFS initialized');
  } else {
    console.error('Database connection not available');
  }
};

// Connect to MongoDB and initialize GridFS
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db(); // Use default database
    initGridFS(db);
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Return GridFS connection instance
function getGridFS() {
  if (!gfs) {
    throw new Error('GridFS is not connected');
  }
  return gfs;
}

module.exports = { getGridFS };
