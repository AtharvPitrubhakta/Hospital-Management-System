// pages/Appointments/AddAppointmentForm.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  MenuItem
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

export default function AddAppointmentForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    status: "pending", // Default status
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({ patientName: "", doctorName: "", date: "", time: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Appointment</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Patient Name"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
          />
          <TextField
            label="Doctor Name"
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
          />
          <TextField
            type="date"
            label="Date"
            name="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
AddAppointmentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
