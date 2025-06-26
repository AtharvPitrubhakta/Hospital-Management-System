const express = require("express");
const router = express.Router();
const {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, getAppointments);

router.post(
  "/",
  authMiddleware,
  authorizeRoles("receptionist", "admin"),
  addAppointment
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("receptionist", "admin"),
  updateAppointment
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAppointment
);

module.exports = router;
