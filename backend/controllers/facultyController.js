const mongoose = require("mongoose");
const multer = require("multer");
const Faculty = require("../models/Faculty");
const { getGridFS } = require("../models/gridfaculty"); // ✅ Ensure gridFaculty is used
const { Readable } = require("stream");

// Multer Storage (Buffer-Based for GridFS)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Document to **Faculty** GridFS & Store Metadata
const facultyuploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { departmentName, classId, section } = req.body;
    if (!departmentName || !classId || !section) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Ensure Faculty GridFSBucket is used
    const gfsFaculty = getGridFS();  
    const fileStream = Readable.from(req.file.buffer);

    // ✅ Ensure it uploads to the 'faculty' bucket
    const uploadStream = gfsFaculty.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    fileStream.pipe(uploadStream);

    uploadStream.on("finish", async (file) => {
      // ✅ Save reference in Faculty collection
      const newFaculty = new Faculty({
        departmentName,
        classId,
        section,
        documentName: req.file.originalname,
        documentId: file._id, // Reference to GridFS
      });

      await newFaculty.save();
      res.status(201).json({ message: "File uploaded to faculty bucket", fileId: file._id });
    });

    uploadStream.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Upload failed" });
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Download Document from **Faculty** GridFS
const downloadDocument = async (req, res) => {
  try {
    const gfsFaculty = getGridFS();
    const facultyDoc = await Faculty.findById(req.params.id);

    if (!facultyDoc) return res.status(404).json({ message: "File not found in Faculty collection" });

    const downloadStream = gfsFaculty.openDownloadStream(new mongoose.Types.ObjectId(facultyDoc.documentId));

    res.set("Content-Disposition", `attachment; filename="${facultyDoc.documentName}"`);
    downloadStream.pipe(res);

    downloadStream.on("error", (err) => {
      console.error("Download error:", err);
      res.status(500).json({ message: "Download failed" });
    });
  } catch (error) {
    console.error("Error downloading document:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { upload, facultyuploadDocument, downloadDocument };
