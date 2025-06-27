import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleIcon from "@mui/icons-material/Article";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "guest";
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      roles: ["admin", "receptionist", "doctor"],
    },
    {
      path: "/doctors",
      label: "Doctors",
      icon: <LocalHospitalIcon />,
      roles: ["admin", "receptionist", "doctor"],
    },
    {
      path: "/patients",
      label: "Patients",
      icon: <PeopleIcon />,
      roles: ["admin", "receptionist"],
    },
    {
      path: "/appointments",
      label: "Appointments",
      icon: <EventNoteIcon />,
      roles: ["admin", "receptionist", "doctor"],
    },
    {
      path: "/reports",
      label: "Medical Reports",
      icon: <ArticleIcon />,
      roles: ["admin", "doctor"],
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
      <Box
        sx={{ p: 2, bgcolor: "#1976d2", color: "#fff", textAlign: "center" }}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 1, fontSize: "1.2rem" }}
        >
          Hospital Management System
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", fontSize: "0.9rem", fontStyle: "italic" }}
        >
          Role: {user?.role}
        </Typography>
      </Box>

      <List>
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
