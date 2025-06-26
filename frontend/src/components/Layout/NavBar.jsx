// components/Layout/NavBar.jsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Welcome, {user?.name || user?.role}
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
