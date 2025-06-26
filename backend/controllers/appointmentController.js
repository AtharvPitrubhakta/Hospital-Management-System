const Appointment = require("../models/Appointment");

// GET all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: err.message });
  }
};

// POST create appointment
exports.addAppointment = async (req, res) => {
  try {
    const { patientName, doctorName, date, time, status } = req.body;

    if (!patientName || !doctorName || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAppointment = await Appointment.create({
      patientName,
      doctorName,
      date,
      time,
      status,
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add appointment", error: err.message });
  }
};

// PUT update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update appointment", error: err.message });
  }
};

// DELETE appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: err.message });
  }
};
