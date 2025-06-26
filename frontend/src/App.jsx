import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/LogIn";
import RegisterForm from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Doctors from "./pages/Doctors/Doctors";
import Patients from "./pages/Patients/Patients";
import Appointments from "./pages/Appointments/Appointment";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import AppLayout from "./components/Layout/AppLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<RegisterForm />} />

          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["admin", "doctor", "receptionist"]}>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctors"
            element={
              <ProtectedRoute roles={["admin", "receptionist", "doctor"]}>
                <AppLayout>
                  <Doctors />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute roles={["admin", "receptionist"]}>
                <AppLayout>
                  <Patients />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute roles={["admin", "doctor", "receptionist"]}>
                <AppLayout>
                  <Appointments />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
