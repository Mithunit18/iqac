const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.post("/upload", facultyController.upload.single("document"), facultyController.facultyuploadDocument);
router.get("/download/:id", facultyController.downloadDocument);

module.exports = router;
