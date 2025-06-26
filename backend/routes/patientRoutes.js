const express = require("express");
const router = express.Router();
const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, getPatients);

router.post("/", authMiddleware, authorizeRoles("receptionist", "admin"), addPatient);

router.put("/:id", authMiddleware, authorizeRoles("receptionist", "admin"), updatePatient);

router.delete("/:id", authMiddleware, authorizeRoles("admin"), deletePatient);

module.exports = router;
