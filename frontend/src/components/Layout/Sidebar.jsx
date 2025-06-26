// components/Layout/Sidebar.jsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useRole } from "../../hooks/useRole.js";

const Sidebar = () => {
  const role = useRole();
  const user = JSON.parse(localStorage.getItem("user"));

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      roles: ["admin", "receptionist", "doctor"],
    },
    {
      path: "/doctors",
      label: "Doctors",
      roles: ["admin", "receptionist", "doctor"],
    },
    { path: "/patients", label: "Patients", roles: ["admin", "receptionist"] },
    {
      path: "/appointments",
      label: "Appointments",
      roles: ["admin", "receptionist", "doctor"],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      {/* 🔥 Project Logo Section */}
      <Box
        component={Link}
        to="/dashboard"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          textDecoration: "none",
          bgcolor: "#1976d2",
          color: "#fff",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          🏥 HMS {user?.name || user?.role}
        </Typography>
      </Box>
      <List>
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
