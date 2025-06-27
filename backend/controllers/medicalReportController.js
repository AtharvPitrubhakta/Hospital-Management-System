const MedicalReport = require("../models/MedicalReport");

exports.getReports = async (req, res) => {
  try {
    const reports = await MedicalReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch reports", error: err.message });
  }
};

exports.addReport = async (req, res) => {
  try {
    const { patientId, title, fileUrl, description } = req.body;
    const report = await MedicalReport.create({
      patientId,
      title,
      fileUrl,
      description,
    });
    res.status(201).json(report);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add report", error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await MedicalReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ message: "Report deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete report", error: err.message });
  }
};
