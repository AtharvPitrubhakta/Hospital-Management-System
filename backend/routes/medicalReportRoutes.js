const express = require("express");
const router = express.Router();

const {
  getReports,
  addReport,
  deleteReport,
} = require("../controllers/medicalReportController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, authorizeRoles("admin", "doctor"), getReports);

router.post("/", authMiddleware, authorizeRoles("admin", "doctor"), addReport);

router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteReport);

module.exports = router;
