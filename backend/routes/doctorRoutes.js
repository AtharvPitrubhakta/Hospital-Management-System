const express = require("express");
const router = express.Router();
const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// All routes require token
router.get("/", authMiddleware, authorizeRoles("admin", "receptionist", "doctor"), getDoctors);
router.post("/", authMiddleware, authorizeRoles("admin"), addDoctor);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateDoctor);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteDoctor);

module.exports = router;
