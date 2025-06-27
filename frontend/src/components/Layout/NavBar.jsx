import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="static"
      sx={{
        mb: 2,
        mt: -0.8,
        ml: -1,
        boxShadow: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ textTransform: "capitalize", fontWeight: "bold" }}
        >
          Welcome, {user?.name || user?.role}
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
