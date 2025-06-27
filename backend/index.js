const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to MongoDB
const mongodb = require("./config/mongoConnect");
mongodb.connect();

// connect to MySQL
const { connectMySQL } = require("./config/mysqlConnect");
connectMySQL();

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/reports", require("./routes/medicalReportRoutes"));


// default
app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
