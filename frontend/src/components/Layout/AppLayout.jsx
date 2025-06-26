// components/Layout/AppLayout.jsx
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <NavBar />
        <Box sx={{ padding: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};


// ✅ Add PropTypes validation
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
