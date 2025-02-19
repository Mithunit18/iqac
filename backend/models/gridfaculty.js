const { MongoClient, GridFSBucket } = require("mongodb");
require("dotenv").config();

let gfsFaculty;
const uri = process.env.MONGO_URI;

// Initialize GridFSBucket for **faculty**
const initGridFSFaculty = async (db) => {
  if (db) {
    gfsFaculty = new GridFSBucket(db, { bucketName: "faculty" }); // ✅ Use 'faculty'
    console.log("✅ GridFS initialized with 'faculty' bucket");
  } else {
    console.error("Database connection not available");
  }
};

// Connect to MongoDB and initialize GridFS for faculty
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db();
    initGridFSFaculty(db);
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Return Faculty GridFS instance
function getGridFS() {
  if (!gfsFaculty) throw new Error("Faculty GridFS is not connected");
  return gfsFaculty;
}

module.exports = { getGridFS };
