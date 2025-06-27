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

export default function AddPatientForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", age: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({ name: "", age: "", address: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Patient</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
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
AddPatientForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
