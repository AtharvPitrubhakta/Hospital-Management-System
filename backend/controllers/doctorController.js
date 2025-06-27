const Doctor = require("../models/Doctor");

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch doctors", error: err.message });
  }
};

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

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.update(req.body);
    res.status(200).json(doctor);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update doctor", error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.destroy();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete doctor", error: err.message });
  }
};
