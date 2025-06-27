import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
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
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 360,
          p: 3,
          bgcolor: "#fff",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom align="center">
          Log In
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Welcome! Please sign in to continue.
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2, fontWeight: 600 }}
        >
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </Box>
    </Box>
  );
}
