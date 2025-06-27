const Patient = require("../models/Patient");

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch patients", error: err.message });
  }
};

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

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await patient.update(req.body);
    res.status(200).json(patient);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update patient", error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await patient.destroy();
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete patient", error: err.message });
  }
};
