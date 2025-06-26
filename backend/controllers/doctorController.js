const Doctor = require("../models/Doctor");

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch doctors", error: err.message });
  }
};

// Add a new doctor
exports.addDoctor = async (req, res) => {
  try {
    const { name, department, email } = req.body;
    const newDoctor = await Doctor.create({ name, department, email });
    res.status(201).json(newDoctor);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add doctor", error: err.message });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update doctor", error: err.message });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete doctor", error: err.message });
  }
};
