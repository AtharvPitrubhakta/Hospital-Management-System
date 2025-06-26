// components/UI/TableWithActions.jsx
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRole } from "../../hooks/useRole.js";

export default function TableWithActions({
  rows,
  columns,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}) {
  
  const role = useRole();

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(rows) &&
            rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row._id}>
                  {columns.map((col) => (
                    <TableCell key={col.id}>{row[col.id]}</TableCell>
                  ))}
                  <TableCell>
                    {/* <IconButton onClick={() => onEdit(row)} color="primary">✏️</IconButton> */}
                    <IconButton onClick={() => onEdit(row)} color="primary">
                      {" "}
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton onClick={() => onDelete(row._id)} color="error">🗑️</IconButton> */}
                    {role === "admin" && (
                      <IconButton
                        onClick={() => onDelete(row._id)}
                        color="error"
                        variant="outlined"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={Array.isArray(rows) ? rows.length : 0}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}

TableWithActions.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
