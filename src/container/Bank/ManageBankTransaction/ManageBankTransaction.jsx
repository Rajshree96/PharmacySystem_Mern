import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Tooltip,
  Divider,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import ViewButton from "../../../common-components/ButtonContainer/ViewButton";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import EditButton from "../../../common-components/ButtonContainer/EditButton";
import DeleteButton from "../../../common-components/ButtonContainer/DeleteButton";
import axios from "axios";
import TablePaginations from "../../../common-components/TablePagination/TablePaginations";
import AllBankModal from "../../../common-components/Modals/bankModals/AllBankModal";

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


const ManageBankTransaction = () => {
  const [ modalType, setModalType ] = useState("");
  const [ selectedManageBankTransaction, setSelectedManageBankTransaction ] = useState(null);

  const [transaction, setTransaction] = useState([]);
  const breadcrumbs = ["Bank", "Manage Bank Transaction"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenModal = (type, managebanktransaction = null) => {
    setModalType(type);
    setSelectedManageBankTransaction(managebanktransaction);
};

const handleCloseModal = () => {
    setModalType("");
    setSelectedManageBankTransaction(null);
};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const fetchTransactions = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (!auth || !auth.token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await axios.get("http://localhost:4000/api/v1/transaction/getAll",
        {
          headers: { Authorization: `Bearer ${auth.token}`}
        }
      );
      console.log("API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setTransaction(response.data.data);
      } else {
        console.error("API response does not contain transaction array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);


  // const handleDeleteClick = async (_id) => {
  //   const auth = JSON.parse(localStorage.getItem('auth'));
  //   if (!auth || !auth.token) {
  //     console.error("No token found in local storage");
  //     return;
  //   }

  //   try {
  //     const response = await axios.delete(`http://localhost:4000/api/v1/cutomer/delete/${_id}`, {
  //       headers: { Authorization: `Bearer ${auth.token}` }
  //     });
  //     console.log("API Response:", response);

  //     if (response.data.status === "ok" || response.status === 200) {
  //       console.log("Deleted customer with _id code:", _id);
  //       fetchCustomer();
  //     } else {
  //       console.error("Failed to delete customer:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting customer:", error);
  //   }
  // };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
             Bank
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead >
                <TableRow>
                  <StyledTableCell>S.no</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Transaction Type</StyledTableCell>
                  <StyledTableCell>Contra Number</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell sx={{textAlign:'center'}}>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* console.log(customers) */}
              {transaction.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction,index) => (
                  <StyledTableRow key={transaction._id}>
                    <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {transaction.date}
                    </StyledTableCell>
                    <StyledTableCell>{transaction.transactionType}</StyledTableCell>
                    <StyledTableCell>{transaction.contraNo}</StyledTableCell>
                    <StyledTableCell>{transaction.amount}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ViewButton
                          sx={{ mr: 1, color: "green  " }}
                          label="View"
                          icon={Visibility}
                        />
                         <EditButton
                          sx={{ mr: 1, color: "#1976d2" }}
                          label="edit"
                          icon={Edit}
                          onClick={() => handleOpenModal("edit managebanktransaction", transaction)} // Pass the managebanktransaction object as a prop
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red  " }}
                          label="delete"
                          icon={Delete}
                          // onClick={() => handleDeleteClick(transaction._id)}
                        />                    
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          <TablePaginations
        count={transaction.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </Paper>
      </Box>
      {/* Modal */}
      <AllBankModal
       open={!!modalType}
       handleClose={handleCloseModal}
       formType={modalType}
       selectedData={selectedManageBankTransaction}
       style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
      />
    </Container>
  );
};

export default ManageBankTransaction;