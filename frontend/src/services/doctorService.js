import API from "./api";

export const getDoctors = () => API.get("/doctors");

export const addDoctor = (data) => API.post("/doctors", data);

export const updateDoctor = (id, data) => API.put(`/doctors/${id}`, data);

export const deleteDoctor = (id) => API.delete(`/doctors/${id}`);
