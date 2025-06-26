import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password, role } = e.target;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email: email.value,
        password: password.value,
        role: role.value,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/dashboard"; // Redirect after register
      } else {
        window.location.href = "/login"; // Or redirect to login if needed
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: "100%",
          maxWidth: 380,
          p: 3,
          bgcolor: "white",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom align="center">
          Register
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Create your account
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          select
          name="role"
          label="Role"
          fullWidth
          required
          margin="normal"
          defaultValue="receptionist"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="receptionist">Receptionist</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2, fontWeight: 600 }}
        >
          {loading ? "Creating Account..." : "Register"}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
