import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import TableWithActions from "../../components/UI/TableWithActions";
import AddAppointmentForm from "./AddAppointmentForm";
import {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../services/appointmentService";
import EditAppointmentForm from "./EditAppointmentForm";
import { TextField, MenuItem } from "@mui/material";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await getAppointments();
      setAppointments(Array.isArray(res.data) ? res.data : res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const handleAdd = async (formData) => {
    try {
      await addAppointment(formData);
      setOpenForm(false);
      fetchAppointments();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(deleteId);
      fetchAppointments();
      setConfirmOpen(false);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleEditClick = (appointment) => {
    setEditAppointment(appointment);
    setOpenEdit(true);
  };

  const handleUpdateAppointment = async (updatedData) => {
    try {
      await updateAppointment(updatedData._id, updatedData);
      fetchAppointments();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointmentColumns = [
    { id: "patientName", label: "Patient" },
    { id: "doctorName", label: "Doctor" },
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "status", label: "Status" },
  ];

  const filteredAppointments = (
    Array.isArray(appointments) ? appointments : []
  ).filter((a) => {
    const doctorMatch = filterDoctor ? a.doctorName === filterDoctor : true;
    const dateMatch = filterDate ? a.date === filterDate : true;
    const statusMatch = filterStatus ? a.status === filterStatus : true;
    return doctorMatch && dateMatch && statusMatch;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Appointments</Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Appointment
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          select
          label="Filter by Doctor"
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {(Array.isArray(appointments)
            ? [...new Set(appointments.map((a) => a.doctorName))]
            : []
          ).map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="Filter by Date"
          InputLabelProps={{ shrink: true }}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableWithActions
          rows={filteredAppointments}
          columns={appointmentColumns}
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

      <AddAppointmentForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAdd}
      />

      <EditAppointmentForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdateAppointment}
        appointment={editAppointment}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>
          Are you sure you want to delete this appointment?
        </DialogTitle>
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
