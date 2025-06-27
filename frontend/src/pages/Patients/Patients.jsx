import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import AddPatientForm from "./AddPatientForm";
import EditPatientForm from "./EditPatientForm";
import {
  getPatients,
  addPatient,
  deletePatient,
  updatePatient,
} from "../../services/patientService";
import TableWithActions from "../../components/UI/TableWithActions";

export default function Patients() {

  const [patients, setPatients] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editPatient, setEditPatient] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await getPatients();
      console.log("API result:", res.data);
      setPatients(Array.isArray(res.data) ? res.data : res.data.data); 
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
    setLoading(false);
  };

  const handleAddPatient = async (data) => {
    try {
      await addPatient(data);
      setOpenForm(false);
      fetchPatients();
    } catch (err) {
      console.error("Error adding patient:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePatient(deleteId);
      setConfirmOpen(false);
      fetchPatients();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleEditClick = (patient) => {
    setEditPatient(patient);
    setOpenEdit(true);
  };

  const handleUpdatePatient = async (updatedData) => {
    try {
      await updatePatient(updatedData._id, updatedData);
      fetchPatients();
    } catch (err) {
      console.error("Error updating patient:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Patients</Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Patient
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableWithActions
          rows={patients}
          columns={[
            { id: "name", label: "Name" },
            { id: "age", label: "Age" },
            { id: "address", label: "Address" },
          ]}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          onEdit={handleEditClick}
          onDelete={openConfirmDialog}
        />
      )}

      <AddPatientForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddPatient}
      />

      <EditPatientForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdatePatient}
        patient={editPatient}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this patient?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
