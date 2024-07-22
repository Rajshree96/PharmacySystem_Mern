import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  styled,
  tableCellClasses
} from "@mui/material";
import { AddCircle, Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import toast, { Toaster } from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#086070",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AddCash = () => {
  const [cash, setCash] = useState([]);
  const [open, setOpen] = useState(false); 
  const [newCash, setNewCash] = useState({ name: "", openingBalance: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const breadcrumbs = ["Cash", "Add Cash"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchCash = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (!auth || !auth.token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await axios.get("http://localhost:4000/api/v1/cash/getAll",        
        {
          headers: { Authorization: `Bearer ${auth.token}`},
        }
      );

      if (response.data && Array.isArray(response.data.cash)) {
        setCash(response.data.cash);
        console.log("####",response);
      } else {
        console.error("API response does not contain cash array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cash data:", error);
    }
  };

  useEffect(() => {
    fetchCash();
  }, [cash]);

  const handleDeleteClick = async (_id) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/cash/delete/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      if (response.data.statusText === "ok" || response.status === 200) {
        console.log("Deleted cash entry with _id:", _id);
        fetchCash();
        toast.success("Cash entry deleted successfully!");
      } else {
        toast.error("Failed to delete cash entry.");
      }
    } catch (error) {
      toast.error("Error deleting cash entry.");
    }
  };

  const handleClickOpen = (item = null) => {
    if (item) {
      setNewCash({ name: item.name, openingBalance: item.openingBalance });
      setEditId(item._id);
      setIsEditing(true);
    } else {
      setNewCash({ name: "", openingBalance: "" });
      setEditId("");
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:4000/api/v1/cash/edit/${editId}`,
          newCash,
          {
            headers: { Authorization: `Bearer ${auth.token}` }
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:4000/api/v1/cash/addcash",
          newCash,
          {
            headers: { Authorization: `Bearer ${auth.token}` }
          }
        );
      }

      if (response.data.statusText === "ok") {
        toast.success(isEditing ? "Cash entry updated successfully!" : "Cash entry added successfully!");
        fetchCash();
        handleClose();
      } else {
        toast.error(isEditing ? "Failed to update cash entry." : "Failed to add cash entry.");
      }
    } catch (error) {
      toast.error(isEditing ? "Error updating cash entry." : "Error adding cash entry.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom >
            Cash
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" className="btn-design" 
              startIcon={<AddCircle />}
              onClick={() => handleClickOpen()} >
            Add Cash
          </Button>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.no</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Opening Balance</StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cash.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell>{item.openingBalance}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ViewButton
                          sx={{ mr: 1, color: "green" }}
                          label="View"
                          icon={Visibility}
                        />
                        <EditButton
                          sx={{ mr: 1, color: "#1976d2" }}
                          label="edit"
                          icon={Edit}
                          onClick={() => handleClickOpen(item)}
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red" }}
                          label="delete"
                          icon={Delete}
                          onClick={() => handleDeleteClick(item._id)}
                        />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginations
            count={cash.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />          
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Cash" : "Add Cash"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCash.name}
            onChange={(e) => setNewCash({ ...newCash, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Opening Balance"
            type="number"
            fullWidth
            variant="standard"
            value={newCash.openingBalance}
            onChange={(e) => setNewCash({ ...newCash, openingBalance: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" className="btn-design">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Toaster />
    </Container>
  );
};

export default AddCash;
