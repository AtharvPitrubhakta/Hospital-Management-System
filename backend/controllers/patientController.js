const Patient = require("../models/Patient");

// GET all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch patients", error: err.message });
  }
};

// POST add patient
exports.addPatient = async (req, res) => {
  try {
    const { name, age, address } = req.body;
    const newPatient = await Patient.create({ name, age, address });
    res.status(201).json(newPatient);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add patient", error: err.message });
  }
};

// PUT update patient
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update patient", error: err.message });
  }
};

// DELETE patient
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete patient", error: err.message });
  }
};
