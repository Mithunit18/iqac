const express = require("express");
const router = express.Router();
const hodController = require("../controllers/hodController");

router.post("/upload", hodController.uploadDocument);
router.get("/document/department/:departmentName", hodController.getDocumentsByDepartment);
router.get("/document/:filename", hodController.downloadDocument);

module.exports = router;
