// pages/Patients/EditPatientForm.jsx
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function EditPatientForm({ open, onClose, onSave, patient }) {
  const [form, setForm] = useState({ name: '', age: '', address: '' });

  useEffect(() => {
    if (patient) setForm(patient);
  }, [patient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form); // pass form data up
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Patient</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Age" name="age" type="number" value={form.age} onChange={handleChange} />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} />
          <Button variant="contained" onClick={handleSubmit}>Update</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

EditPatientForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  patient: PropTypes.object, // patient object to edit
};
