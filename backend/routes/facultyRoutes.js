const express = require("express");
const { uploadSingle, uploadDocument, getDocuments, getFacultyAuth } = require("../controllers/facultyController");

const router = express.Router();

router.post("/faculty-login", getFacultyAuth); // Correct route
router.post("/upload", uploadSingle, uploadDocument);
router.get("/documents/:emailId", getDocuments);

module.exports = router;
