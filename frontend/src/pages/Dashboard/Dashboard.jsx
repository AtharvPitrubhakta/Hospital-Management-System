// pages/Dashboard/Dashboard.jsx
import { Grid, Container } from '@mui/material';
import ChartComponent from '../../components/UI/ChartComponent'

const Dashboard = () => {
  // Dummy data (replace later with API)
  const appointmentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Appointments',
        data: [12, 19, 8, 15, 22, 17],
        borderColor: '#1976d2',
        fill: false,
      },
    ],
  };

  const departmentData = {
    labels: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics'],
    datasets: [
      {
        data: [30, 20, 25, 15],
        backgroundColor: ['#1976d2', '#9c27b0', '#f44336', '#ff9800'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ChartComponent title="Appointments This Week" data={appointmentData} options={options} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent title="Patients Per Department" type="doughnut" data={departmentData} options={options} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
