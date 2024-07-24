import React, { useEffect, useRef, useState } from "react";
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
import PurchasePayment from "../PurchaseInvoice/PurchasePayment";
import { useReactToPrint } from "react-to-print";
import AllPurchaseModal from "../../../common-components/Modals/PurchaseModal/AllPurchaseModal";


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

const ManagePurchaseOrder = () => {
  const [ modalType, setModalType ] = useState("");
  const [ selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);

  const [purchaseData, setPurchaseData] = useState([]);
  const breadcrumbs = ["Purchase", "Manage Purchase Order"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [ tables, setTables ] = useState([
//     {
//         id: Date.now(),
//         rows: [ initialRow ],
//     },
// ]);
// const [ otherCharges, setOtherCharges ] = useState([]);
// const [ reverseCharge, setReverseCharge ] = useState("No");
// const [ date, setDate ] = useState("");
// const [ paymentTerms, setPaymentTerms ] = useState("");
// const [ dueDate, setDueDate ] = useState("");
// const [ charges, setCharges ] = useState([]);
// const [ totalCharges, setTotalCharges ] = useState(0);
// const [ currentCharge, setCurrentCharge ] = useState("");
// const [ chargeLabel, setChargeLabel ] = useState("");
// const [ invoiceNo, setInvoiceNo ] = useState("");
// const [ supplier, setSupplier ] = useState([]);
// const [ selectedSupplier, setSelectedSupplier ] = useState("");
// const [ orderNo, setOrderNo ] = useState("");
// const[orders,setOrders]=useState([]);
// const [ placeOfSupply, setPlaceOfSupply ] = useState("");
// const [ billingAddress, setBillingAddress ] = useState("");
// const [ grossAmount, setGrossAmount ] = useState("");
// const [ gstAmount, setGstAmount ] = useState("");
// const [ netAmount, setNetAmount ] = useState("");
// const [ narration, setNarration ] = useState("");
// const [ taxType, setTaxType ] = useState("");

// const [ transPortDetails, setTransPortDetails ] = useState({
//     receiptNumber: "",
//     dispatchedThrough: "",
//     destination: "",
//     carrierName: "",
//     billOfLading: "",
//     vehicleNumber: "",
// });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenModal = (type, purchaseorder = null) => {
    setModalType(type);
    setSelectedPurchaseOrder(purchaseorder);
};

const handleCloseModal = () => {
    setModalType("");
    setSelectedPurchaseOrder(null);
};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchPurchaseList = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (!auth || !auth.token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await axios.get("http://localhost:4000/api/v1/purchase/getall",
        {
          headers: { Authorization: `Bearer ${auth.token}` }
        }
      );
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setPurchaseData(response.data);
      } else {
        console.error("API response does not contain purchase array:", response.data.result);
      }
    } catch (error) {
      console.error("Error fetching purchase list:", error);
    }
  };

  useEffect(() => {
    fetchPurchaseList();

  }, []);
 

  const handleDeleteClick = async (_id) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/purchase/delete/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response);

      if (response.data.status === "ok" || response.status === 200) {
        console.log("Deleted purchase with _id code:", _id);
        fetchPurchaseList();
      } else {
        console.error("Failed to delete purchase:", response.data);
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const resumeRef = useRef();

  const handlePrintClick = (id) => {
    const purchase = purchaseData.find(item => item._id === id);
    setSelectedPurchase(purchase);
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `Purchase_${selectedPurchase ? selectedPurchase._id : ''}`,
  });

  const handleOpen = () => setOpen(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

 
const fetchPurchaseByOrderNumber = async (orderNo) => {
        
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }
    const response = await axios.get(`http://localhost:4000/api/v1/purchase/get/${orderNo}`,
      {
        
        headers: { Authorization: `Bearer ${auth.token}` }
      },
    );
    console.log("API Response:", response.data);

    if (response.data) {
        return response.data;
    } else {
      console.error("API response does not contain purchase data:", response.data);
    }
  } catch (error) {
    console.error("Error fetching purchase data:", error);
    
  } 
};


const addPurchaseInvoice = async (orderNo) => {
  handleOpenModal();
  try {
    const purchaseData = await fetchPurchaseByOrderNumber(orderNo);
     if (purchaseData) {
    //   console.log("Fetched Purchase Data:", purchaseData);
    //   setDate(purchaseData.date);
    //   setInvoiceNo(purchaseData.invoiceNo);
    //   setSelectedSupplier(purchaseData.supplierName);
    //   setPlaceOfSupply(purchaseData.placeOfSupply);
    //   setPaymentTerms(purchaseData.paymentTerm);
    //   setDueDate(purchaseData.dueDate);
    //   setTransPortDetails(purchaseData.transPortDetails);
    //   setBillingAddress(purchaseData.billingAddress);
    //   setReverseCharge(purchaseData.reverseCharge);
    //   setTables([{ id: Date.now(), rows: purchaseData.purchaseTable }]);
    //   setGrossAmount(purchaseData.amounts.grossAmount);
    //   setGstAmount(purchaseData.amounts.gstAmount);
    //   setOtherCharges(purchaseData.amounts.otherCharge);
    //   setNetAmount(purchaseData.amounts.netAmount);
    //   setNarration(purchaseData.Narration);

    //   console.log(purchaseData);

      const auth = JSON.parse(localStorage.getItem("auth"));
      const response = await axios.post("http://localhost:4000/api/v1/purchase-invoice/add", purchaseData, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response);
      if (response.data.status === 201) {
        console.log("purchase created successfully");
      }
    }
  } catch (error) {
    console.log("something went wrong", error);
  }
};
const handleInvoiceClick = async (purchaseData) => {
  handleOpenModal("add purchaseinvoice", purchaseData);
  await addPurchaseInvoice(purchaseData.orderNo);
  
};

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} ref={resumeRef}>
      <Box>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Purchase
          </Typography>
          <BreadcrumbContainer breadcrumbs={breadcrumbs} />
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sno.</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Order No.</StyledTableCell>
                  <StyledTableCell>Supplier Name</StyledTableCell>
                  <StyledTableCell>Place of Supply</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Payment Status</StyledTableCell>
                  <StyledTableCell>
                    <Typography sx={{ display: "flex", justifyContent: "center" }}>Action</Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* console.log(customers) */}
                {purchaseData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((purchaseData, index) => (
                  <StyledTableRow key={purchaseData._id}>
                    <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {purchaseData.date}
                    </StyledTableCell>
                    <StyledTableCell>{purchaseData.orderNo}</StyledTableCell>
                    <StyledTableCell>{purchaseData.supplierName}</StyledTableCell>
                    <StyledTableCell>{purchaseData.placeOfSupply}</StyledTableCell>
                    <StyledTableCell>{purchaseData.dueDate}</StyledTableCell>
                    <StyledTableCell>{purchaseData.paymentStatus}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        style={{ display: "flex", justifyContent: "space-between",gap:"2px" }}
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
                          onClick={() => handleOpenModal("edit purchaseorder", purchaseData)} // Pass the supplier object as a prop
                        />
                        <DeleteButton
                          sx={{ mr: 1, color: "red  " }}
                          label="delete"
                          icon={Delete}
                          onClick={() => handleDeleteClick(purchaseData._id)}
                        />
                        <Button
                          className="btn-design-invoice"
                          sx={{ color: 'white', height: '2.3rem' }}
                          label="Print"
                          // onClick={() => addPurchaseInvoice(purchaseData.orderNo)} // Pass the supplier object as a prop
                          onClick={() => handleOpenModal("add purchaseinvoice", purchaseData)} 
                          // onClick={() => handleInvoiceClick(purchaseData) }                                             
                        >
                          Invoice
                        </Button>
                        <PurchasePayment onClick={handleSubmit}
                          handleOpen={handleOpen}
                          netAmount={purchaseData.amounts.netAmount} orderNo={purchaseData.orderNo}
                          label="Payout"
                        />
                        <Button
                          className="btn-design-print"
                          sx={{ color: 'white', height: '2.3rem' }}
                          label="Print"
                          onClick={() => {
                            handlePrintClick(purchaseData._id);
                            handlePrint();
                          }}
                        >
                          Print
                        </Button>

                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePaginations
            count={purchaseData.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Paper>
      </Box>

      {/* Modal */}
      <AllPurchaseModal
       open={!!modalType}
       handleClose={handleCloseModal}
       formType={modalType}
       selectedData={selectedPurchaseOrder}
       style={{ width: "80%", maxWidth: "60%" }}  // Adjust the width of the modal as needed
      />
    </Container>
  );
};

export default ManagePurchaseOrder;