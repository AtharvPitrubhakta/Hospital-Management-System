import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

export default function AddDoctorForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", department: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({ name: "", department: "", email: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Doctor</DialogTitle>
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
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

AddDoctorForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
