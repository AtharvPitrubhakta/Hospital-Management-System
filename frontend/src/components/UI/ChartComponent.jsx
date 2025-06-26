// components/UI/ChartComponent.jsx
import { Box, Typography } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function ChartComponent({ title, type = 'line', data, options }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {type === 'line' && <Line data={data} options={options} />}
      {type === 'doughnut' && <Doughnut data={data} options={options} />}
    </Box>
  );
}

ChartComponent.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['line', 'doughnut']),
  data: PropTypes.object.isRequired,
  options: PropTypes.object, // ✅ this resolves your warning
};
