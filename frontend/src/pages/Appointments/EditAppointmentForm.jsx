// pages/Appointments/EditAppointmentForm.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditAppointmentForm({
  open,
  onClose,
  onSave,
  appointment,
}) {
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    status: "pending", // Default status
  });

  useEffect(() => {
    if (appointment) setForm(appointment);
  }, [appointment]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Appointment</DialogTitle>
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
            Update
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
EditAppointmentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  appointment: PropTypes.object,
};
