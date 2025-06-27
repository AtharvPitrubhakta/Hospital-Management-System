import { Grid, Container, Typography, Box, Paper } from '@mui/material';
import ChartComponent from '../../components/UI/ChartComponent';

const Dashboard = () => {
  const appointmentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Appointments',
        data: [12, 19, 8, 15, 22, 17],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        tension: 0.4,
        fill: true,
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
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#e3f2fd',
          p: 3,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Welcome Back 👨‍⚕️
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here&#39;s a summary of your hospital&#39;s performance of this week
          </Typography>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ChartComponent
              title="Appointments This Week"
              data={appointmentData}
              options={options}
              type="line"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ChartComponent
              title="Patients Per Department"
              data={departmentData}
              options={options}
              type="doughnut"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
