// pages/Doctors/Doctors.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody,
  CircularProgress,
  // TablePagination,
} from "@mui/material";
import AddDoctorForm from "./AddDoctorForm";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getDoctors,
  addDoctor,
  deleteDoctor,
  updateDoctor,
} from "../../services/doctorService";
import TableWithActions from "../../components/UI/TableWithActions";
import EditDoctorForm from "./EditDoctorForm";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = useState(0); // current page index
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page
  const [deleteId, setDeleteId] = useState(null); // ID to delete
  const [confirmOpen, setConfirmOpen] = useState(false); // dialog toggle
  const [editDoctor, setEditDoctor] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getDoctors();
      console.log("Doctors fetched:", res.data);
      setDoctors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      // console.error("Error fetching doctors:", err);
      console.error(
        "❌ Error fetching doctors:",
        err.response?.data || err.message
      );
      console.log("📛 Token used:", localStorage.getItem("token"));
    }
    setLoading(false);
  };

  const handleAddDoctor = async (data) => {
    try {
      await addDoctor(data);
      setOpenForm(false);
      fetchDoctors();
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoctor(deleteId);
      setConfirmOpen(false);
      fetchDoctors(); // refresh table
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleEditClick = (doctor) => {
    setEditDoctor(doctor);
    setOpenEdit(true);
  };

  const handleUpdateDoctor = async (updatedData) => {
    try {
      await updateDoctor(updatedData._id, updatedData);
      fetchDoctors(); // reload list
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
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
        <Typography variant="h5">Doctors</Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Doctor
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableWithActions
          rows={doctors}
          columns={[
            { id: "name", label: "Name" },
            { id: "department", label: "Department" },
            { id: "email", label: "Email" },
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

      <AddDoctorForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddDoctor}
      />

      <EditDoctorForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdateDoctor}
        doctor={editDoctor}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this doctor?</DialogTitle>
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
