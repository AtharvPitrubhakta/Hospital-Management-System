import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EditDoctorForm({ open, onClose, onSave, doctor }) {
  const [form, setForm] = useState({ name: "", department: "", email: "" });

  useEffect(() => {
    if (doctor) setForm(doctor);
  }, [doctor]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Doctor</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

EditDoctorForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  doctor: PropTypes.object, 
};
