import API from "./api";

export const getAllReports = () => API.get("/reports");

export const getReportsByPatient = (patientId) =>
  API.get(`/reports?patientId=${patientId}`);

export const uploadReport = (data) => API.post("/reports", data);

export const deleteReport = (id) => API.delete(`/reports/${id}`);
