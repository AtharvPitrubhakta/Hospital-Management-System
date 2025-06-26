// import { TextField, Button, Box, Typography, InputLabel } from "@mui/material";
// import axios from "axios";

// export default function LoginForm() {

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:5000/api/auth/login", {
//       email: e.target.email.value,
//       password: e.target.password.value,
//     });

//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       window.location.href = "/dashboard"; // Redirect to dashboard on successful login
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         margin: "auto",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "320px",
//           border: "2px solid black",
//           padding: 2,
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
//           Log In
//         </Typography>
//         <Typography gutterBottom>
//           Welcome user, please sign in to continue
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             type="email"
//             name="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//           <InputLabel htmlFor="outlined-adornment-password" size="small" />
//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />

//           <Button
//             type="submit"
//             size="small"
//             color="info"
//             disableElevation
//             variant="outlined"
//             fullWidth
//             sx={{ my: 2, fontWeight: 700 }}
//           >
//             Log In
//           </Button>
//         </form>
//       </Box>
//     </div>
//   );
// }

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
        window.location.href = "/dashboard"; // redirect after login
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


// import * as React from 'react';
// import {
//   Button,
//   FormControl,
//   Checkbox,
//   FormControlLabel,
//   InputLabel,
//   OutlinedInput,
//   TextField,
//   InputAdornment,
//   Link,
//   Alert,
//   IconButton,
// } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { useTheme } from '@mui/material/styles';

// const providers = [{ id: 'credentials', name: 'Email and Password' }];

// function CustomEmailField() {
//   return (
//     <TextField
//       id="input-with-icon-textfield"
//       label="Email"
//       name="email"
//       type="email"
//       size="small"
//       required
//       fullWidth
//       slotProps={{
//         input: {
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle fontSize="inherit" />
//             </InputAdornment>
//           ),
//         },
//       }}
//       variant="outlined"
//     />
//   );
// }

// function CustomPasswordField() {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
//       <InputLabel size="small" htmlFor="outlined-adornment-password">
//         Password
//       </InputLabel>
//       <OutlinedInput
//         id="outlined-adornment-password"
//         type={showPassword ? 'text' : 'password'}
//         name="password"
//         size="small"
//         endAdornment={
//           <InputAdornment position="end">
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               onMouseDown={handleMouseDownPassword}
//               edge="end"
//               size="small"
//             >
//               {showPassword ? (
//                 <VisibilityOff fontSize="inherit" />
//               ) : (
//                 <Visibility fontSize="inherit" />
//               )}
//             </IconButton>
//           </InputAdornment>
//         }
//         label="Password"
//       />
//     </FormControl>
//   );
// }

// function CustomButton() {
//   return (
//     <Button
//       type="submit"
//       variant="outlined"
//       color="info"
//       size="small"
//       disableElevation
//       fullWidth
//       sx={{ my: 2 }}
//     >
//       Log In
//     </Button>
//   );
// }

// function SignUpLink() {
//   return (
//     <Link href="/" variant="body2">
//       Sign up
//     </Link>
//   );
// }

// function ForgotPasswordLink() {
//   return (
//     <Link href="/" variant="body2">
//       Forgot password?
//     </Link>
//   );
// }

// function Title() {
//   return <h2 style={{ marginBottom: 8 }}>Login</h2>;
// }

// function Subtitle() {
//   return (
//     <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="warning">
//       Welcome user, please sign in to continue
//     </Alert>
//   );
// }

// function RememberMeCheckbox() {
//   const theme = useTheme();
//   return (
//     <FormControlLabel
//       label="Remember me"
//       control={
//         <Checkbox
//           name="remember"
//           value="true"
//           color="primary"
//           sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
//         />
//       }
//       slotProps={{
//         typography: {
//           color: 'textSecondary',
//           fontSize: theme.typography.pxToRem(14),
//         },
//       }}
//     />
//   );
// }

// export default function SlotsSignIn() {
//   const theme = useTheme();
//   return (
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={(provider, formData) =>
//           alert(
//             `Logging in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}, and checkbox value: ${formData.get('remember')}`,
//           )
//         }
//         slots={{
//           title: Title,
//           subtitle: Subtitle,
//           emailField: CustomEmailField,
//           passwordField: CustomPasswordField,
//           submitButton: CustomButton,
//           signUpLink: SignUpLink,
//           rememberMe: RememberMeCheckbox,
//           forgotPasswordLink: ForgotPasswordLink,
//         }}
//         slotProps={{ form: { noValidate: true } }}
//         providers={providers}
//       />
//     </AppProvider>
//   );
// }
