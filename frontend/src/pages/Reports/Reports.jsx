import { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, IconButton } from "@mui/material";
import { getAllReports, deleteReport } from "../../services/reportService";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Reports() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const res = await getAllReports();
    setReports(res.data);
  };

  const handleDelete = async (id) => {
    await deleteReport(id);
    fetchReports();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>📄 Medical Reports</Typography>
      {reports.length === 0 && <Typography>No reports available.</Typography>}

      {reports.map((report) => (
        <Card key={report._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{report.title}</Typography>
            <Typography color="textSecondary">{report.description}</Typography>
            <Typography variant="caption">📅 {new Date(report.createdAt).toLocaleDateString()}</Typography>
            <Box mt={1}>
              <Button href={report.fileUrl} target="_blank">View Report</Button>
              <IconButton onClick={() => handleDelete(report._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
