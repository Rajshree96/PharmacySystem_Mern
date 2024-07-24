import React, {useState, useRef, useEffect} from "react";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    Grid,
    Typography,
    Paper,
    Box,
    Divider,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    List,
    ListItem,
} from "@mui/material";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import BreadcrumbContainer from "../../../common-components/BreadcrumbContainer/BreadcrumbContainer";
import TransportDetails from "../../../common-components/Modals/PurchaseModal/TranspotDetails";
import {useReactToPrint} from "react-to-print";
import {format, addDays} from "date-fns";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const initialRow = {
    sno: "",
    itemCode: "",
    productName: "",
    qty: "",
    freeQty: "",
    mrp: "",
    retailPrice: "",
    discount1: "",
    discount2: "",
    taxableValue: "",
    cgst: "",
    sgst: "",
    igst: "",
    totalValue: "",
};

const productOptions = [
    {value: "product1", label: "Product 1"},
    {value: "product2", label: "Product 2"},
    {value: "product3", label: "Product 3"},
];

function ProductTable({rows, onAddRow, onRemoveRow, onRowChange}) {
    const calculateTotal = (key) => {
        return rows.reduce((sum, row) => sum + parseFloat(row[key] || 0), 0).toFixed(2);
    };
    const handleInputChange = (index, field, value) => {
        const updatedRows = [ ...rows ];
        updatedRows[index][field] = value;
        onRowChange(updatedRows);
    };

    return (
        <TableContainer sx={{mb: 2}} maxWidth="xl">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            S.no
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Item Code
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Product Name
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Qty
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            MRP
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Retail Price
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Taxable Value
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            CGST
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            SGST
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            IGST
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Total Value
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.sno}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "sno", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.itemCode}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "itemCode", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <Select
                                    value={row.productName}
                                    onChange={(e) => handleInputChange(index, "productName", e.target.value)}
                                    fullWidth
                                    size="small"
                                >
                                    <MenuItem value="" disabled>
                                        Select Product
                                    </MenuItem>
                                    {productOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.qty}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "qty", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.mrp}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "mrp", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.retailPrice}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "retailPrice", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.taxableValue}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "taxableValue", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.cgst}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "cgst", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.sgst}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "sgst", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.igst}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "igst", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.totalValue}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "totalValue", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid white"}}>
                                <Box sx={{display: "flex", justifyContent: "center"}}>
                                    <IconButton onClick={() => onRemoveRow(index)} color="error">
                                        <RemoveCircle />
                                    </IconButton>
                                    <IconButton onClick={onAddRow} color="success">
                                        <AddCircle />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell
                            sx={{border: "1px solid grey", fontWeight: 700, fontSize: "15px"}}
                            colSpan={1}
                            align="right"
                        >
                            Total
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", textAlign: "center"}}>-</TableCell>
                        <TableCell sx={{border: "1px solid grey", textAlign: "center"}}>-</TableCell>
                        <TableCell sx={{border: "1px solid grey", textAlign: "center"}}>
                            {calculateTotal("qty")}
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", textAlign: "center"}}>-</TableCell>
                        <TableCell sx={{border: "1px solid grey", textAlign: "center"}}>-</TableCell>
                        <TableCell sx={{border: "1px solid grey"}}>{calculateTotal("taxableValue")}</TableCell>
                        <TableCell sx={{border: "1px solid grey"}}>{calculateTotal("cgst")}</TableCell>
                        <TableCell sx={{border: "1px solid grey"}}>{calculateTotal("sgst")}</TableCell>
                        <TableCell sx={{border: "1px solid grey"}}>{calculateTotal("igst")}</TableCell>
                        <TableCell sx={{border: "1px solid grey"}}>{calculateTotal("totalValue")}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function SalesInvoice({formType, selectedData, setSuccess}) {
    const breadcrumbs = [ "Sales", "Sales Invoice" ];
    const [ tables, setTables ] = useState([
        {
            id: Date.now(),
            rows: [ initialRow ],
        },
    ]);
    const [ otherCharges, setOtherCharges ] = useState("");
    const [ reverseCharge, setReverseCharge ] = useState("No");
    const [ date, setDate ] = useState("");
    const [ paymentTerms, setPaymentTerms ] = useState("");
    const [ dueDate, setDueDate ] = useState("");
    const [ estimateNo, setEstimateNo ] = useState("");
    const[estimates,setEstimates]=useState([]);
    
    const [ charges, setCharges ] = useState([]);
    const [ totalCharges, setTotalCharges ] = useState(0);
    const [ currentCharge, setCurrentCharge ] = useState("");
    const [ chargeLabel, setChargeLabel ] = useState("");
    const [ invoiceNo, setInvoiceNo ] = useState("");
    const [ customerName, setCustomerName ] = useState("");
    const [ placeOfSupply, setPlaceOfSupply ] = useState("");
    const [ billingAddress, setBillingAddress ] = useState("");
    const [ grossAmount, setGrossAmount ] = useState("");
    const [ gstAmount, setGstAmount ] = useState("");
    const [ netAmount, setNetAmount ] = useState("");
    const [ narration, setNarration ] = useState("");
    const [ transPortDetails, setTransPortDetails ] = useState({
        receiptNumber: "",
        dispatchedThrough: "",
        destination: "",
        carrierName: "",
        billOfLading: "",
        vehicleNumber: "",
    });

    useEffect(() => {
        if (formType === "edit salesinvoice" && selectedData) {
            setOtherCharges(selectedData.otherCharges);
            setReverseCharge(selectedData.reverseCharge);
            setDate(selectedData.date);
            setPaymentTerms(selectedData.paymentTerm);
            setDueDate(selectedData.dueDate);
            setCharges(selectedData.charges);
            setTotalCharges(selectedData.totalCharges);
            setInvoiceNo(selectedData.invoiceNo);
            setCustomerName(selectedData.customerName);
            setPlaceOfSupply(selectedData.placeOfSupply);
            setBillingAddress(selectedData.billingAddress);
            setGrossAmount(selectedData.amounts.grossAmount);
            setGstAmount(selectedData.amounts.gstAmount);
            setNetAmount(selectedData.amounts.netAmount);
            setNarration(selectedData.Narration);
            setTransPortDetails(selectedData.transPortDetails);
            // Update tables state with the selected data
            setTables([ {id: Date.now(), rows: selectedData.purchaseTable} ]);
        }
        else {
            resetForm();
        }
    }, [ formType, selectedData ]);

    const resetForm = () => {
        setOtherCharges("");
        setReverseCharge("No");
        setDate("");
        setPaymentTerms("");
        setDueDate("");
        setCharges([]);
        setTotalCharges(0);
        setInvoiceNo("");
        setCustomerName("");
        setPlaceOfSupply("");
        setBillingAddress("");
        setGrossAmount("");
        setGstAmount("");
        setNetAmount("");
        setNarration("");
        setTransPortDetails({
            receiptNumber: "",
            dispatchedThrough: "",
            destination: "",
            carrierName: "",
            billOfLading: "",
            vehicleNumber: "",
        });
    };

    useEffect(() => {
        if (date && paymentTerms) {
            const newDueDate = addDays(new Date(date), parseInt(paymentTerms));
            setDueDate(format(newDueDate, "yyyy-MM-dd"));
        }
    }, [ date, paymentTerms ]);

    const handleAddRow = (tableId) => {
        setTables(
            tables.map((table) => (table.id === tableId ? {...table, rows: [ ...table.rows, {...initialRow} ]} : table))
        );
    };

    const handleRemoveRow = (tableId, rowIndex) => {
        setTables(
            tables.map((table) =>
                table.id === tableId
                    ? {
                          ...table,
                          rows: table.rows.filter((_, index) => index !== rowIndex),
                      }
                    : table
            )
        );
    };
    const handleAddOtherCharge = () => {
        setOtherCharges([ ...otherCharges, "" ]);
    };

    const handleOtherChargeChange = (index, value) => {
        const updatedCharges = [ ...otherCharges ];
        updatedCharges[index] = value;
        setOtherCharges(updatedCharges);
    };

    const resumeRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => resumeRef.current,
    });

    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddCharge = () => {
      const chargeAmount = parseFloat(currentCharge);
      if (chargeLabel && !isNaN(chargeAmount)) {
          const newCharge = {label: chargeLabel, amount: chargeAmount};
          setCharges([ ...charges, newCharge ]);
          setTotalCharges(totalCharges + chargeAmount);
          setChargeLabel("");
          setCurrentCharge("");
          setOpen(false);
      }
  };

    const handleRowChange = (tableId, updatedRows) => {
        setTables(tables.map((table) => (table.id === tableId ? {...table, rows: updatedRows} : table)));
    };

    const addSalesInvoice = async (salesInvoice) => {
        console.log(salesInvoice);
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const response = await axios.post(
                "http://localhost:4000/api/v1/salesinvoice/addSalesInvoice",
                salesInvoice,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );
            console.log("salesInvoice response", response);
            if (response.data.status === 201) {
                console.log("salesInvoice created successfully ");
            }
        } catch (error) {
            console.log("Somthing went wrong");
        }
    };

    // const handleSubmit = async (event) => {

    //   event.preventDefault();

    //   const salesInvoice = {
    //     date: date,
    //     invoiceNo: invoiceNo,
    //     customerName: customerName,
    //     placeOfSupply: placeOfSupply,
    //     paymentTerm: paymentTerms,
    //     dueDate: dueDate,
    //     transPortDetails:transPortDetails,
    //     billingAddress: billingAddress,
    //     reverseCharge: reverseCharge,
    //     purchaseTable: tables[0].rows,
    //     amounts: {
    //         grossAmount: grossAmount,
    //         gstAmount: gstAmount,
    //         otherCharge: otherCharges,
    //         netAmount: netAmount
    //     },
    //     Narration:narration
    // };

    //   try {
    //     await addSalesInvoice(salesInvoice);
    //     // handleAddMedicine();

    //   } catch (error) {
    //     console.error('Error adding salesInvoice:', error);

    //   }
    // };
    console.log(tables);
    console.log(transPortDetails);

    const handleSaveSalesEstimate = async (e) => {
        e.preventDefault();

        const salesInvoiceData = {
            date: date,
            invoiceNo: invoiceNo,
            customerName: customerName,
            placeOfSupply: placeOfSupply,
            paymentTerm: paymentTerms,
            dueDate: dueDate,
            transPortDetails: transPortDetails,
            billingAddress: billingAddress,
            reverseCharge: reverseCharge,
            purchaseTable: tables[0].rows,
            amounts: {
                grossAmount: grossAmount,
                gstAmount: gstAmount,
                otherCharge: otherCharges,
                netAmount: netAmount,
            },
            Narration: narration,
        };

        try {
            if (formType === "edit salesestimate") {
                // await editSalesEstimate(selectedData._id, salesInvoiceData);
                console.log("Sales Invoice updated successfully");
                setSuccess(true);
                // toast.success("sales Estimate edited successfully");
            }
            else {
                await addSalesInvoice(salesInvoiceData);
                toast.success("Sales Invoice added successfully");
            }
        } catch (error) {
            console.error(`Error ${formType === "edit salesestimate" ? "editing" : "adding"}   salesestimate:`, error);
        }
    };

    return (
        <Container maxWidth="xl" ref={resumeRef}>
            <Toaster />
            <Paper sx={{p: 2, mb: 2}}>
                {/* Purchase Order */}
                <Box sx={{p: 2, mb: 2}}>
                    <Typography variant="h4" gutterBottom>
                        Sales
                    </Typography>
                    <BreadcrumbContainer breadcrumbs={breadcrumbs} />
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                label="Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Estimate No."
                                fullWidth
                                value={estimateNo}
                                onChange={handleSaveSalesEstimate}
                            >                           
                                {estimates.map((estimate) => (
                                    <MenuItem key={estimate._id} value={estimate.estimateNo}>
                                        {estimate.estimateNo}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Invoice No."
                                fullWidth
                                value={invoiceNo}
                                onChange={(e) => setInvoiceNo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Customer Name"
                                fullWidth
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            >
                                <MenuItem value="CustomerName1">CustomerName1</MenuItem>
                                <MenuItem value="CustomerName2">CustomerName2</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Place of Supply"
                                fullWidth
                                value={placeOfSupply}
                                onChange={(e) => setPlaceOfSupply(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Payment Terms"
                                fullWidth
                                value={paymentTerms}
                                onChange={(e) => setPaymentTerms(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Due Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                value={dueDate}
                                InputProps={{readOnly: true}}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Divider sx={{my: 2}} />

                {/* Transport Details */}
                <Box sx={{p: 2, mb: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Transport Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item md={4} xs={4}>
                            <TransportDetails
                                transPortDetails={transPortDetails}
                                setTransPortDetails={setTransPortDetails}
                            />
                        </Grid>
                        <Grid item md={4} xs={4}>
                            <TextField
                                label="Billing Address"
                                fullWidth
                                value={billingAddress}
                                onChange={(e) => setBillingAddress(e.target.value)}
                            />
                        </Grid>
                        <Grid item md={4} xs={4}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Reverse Charge"
                                fullWidth
                                value={reverseCharge}
                                onChange={(e) => setReverseCharge(e.target.value)}
                            >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Divider sx={{my: 2}} />

                {/* Product Details */}
                <Box sx={{p: 2}}>
                    <Typography variant="h5" gutterBottom>
                        Product Tables
                    </Typography>
                    {tables.map((table) => (
                        <ProductTable
                            key={table.id}
                            rows={table.rows}
                            onAddRow={() => handleAddRow(table.id)}
                            onRemoveRow={(rowIndex) => handleRemoveRow(table.id, rowIndex)}
                            onRowChange={(updatedRows) => handleRowChange(table.id, updatedRows)}
                        />
                    ))}
                </Box>

                {/* Add Other Charges */}
                <Grid container spacing={2} sx={{p: 2, mb: 2}}>
                    <Grid item md={4} xs={4}>
                        <Button
                            variant="contained"
                            onClick={handleOpen}
                            sx={{mb: 2}}
                            startIcon={<AddCircle />}
                            className="btn-design"
                        >
                            Add Other Charges
                        </Button>
                        <Modal open={open} onClose={handleClose} sx={{maxWidth: "xl"}}>
                            <Grid container spacing={1} sx={style} maxWidth="xl">
                                <Grid item md={12} xs={12}>
                                    <Typography variant="h6" sx={{fontWeight: 700}}>
                                        {" "}
                                        Other Charges
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        sx={{mt: 2}}
                                        label="Other Charges Name"
                                        value={chargeLabel}
                                        onChange={(e) => setChargeLabel(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        sx={{mt: 2}}
                                        label="Other Charges Amount"
                                        value={currentCharge}
                                        onChange={(e) => setCurrentCharge(e.target.value)}
                                    />                                   
                                    <Button
                                        className="btn-design"
                                        sx={{color: "white", mt: 2}}
                                        onClick={handleAddCharge}
                                    >
                                        Add
                                    </Button>
                                    <List>
                                        {charges.map((charge, index) => (
                                            <ListItem key={index}>
                                                {charge.label}: {charge.amount.toFixed(2)}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Modal>
                        <TextField
                            label="Narration"
                            fullWidth
                            multiline
                            rows={3}
                            value={narration}
                            onChange={(e) => setNarration(e.target.value)}
                        />
                    </Grid>
                    {/* Gross Amount */}
                    <Grid item md={8} xs={8}>
                        <Box style={{display: "grid", justifyContent: "center", gap: "15px"}}>
                            <TextField
                                label="Gross Amount"
                                fullWidth
                                value={grossAmount}
                                onChange={(e) => setGrossAmount(e.target.value)}
                            />
                            <TextField
                                label="GST Amount"
                                fullWidth
                                value={gstAmount}
                                onChange={(e) => setGstAmount(e.target.value)}
                            />
                            <TextField
                                label="Other Charge"
                                fullWidth
                                value={totalCharges}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Net Amount"
                                fullWidth
                                value={netAmount}
                                onChange={(e) => setNetAmount(e.target.value)}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{my: 2}} />

                {/* Button */}
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sx={{display: "flex", justifyContent: "center", gap: "10px"}}>
                        <Button
                            variant="contained"
                            className="btn-design"
                            // onClick={handleSubmit}
                            onClick={handleSaveSalesEstimate}
                        >
                            {formType === "edit salesinvoice" ? "Update Invoice " : "Save Invoice "}
                        </Button>

                        <Button variant="contained" className="btn-design" onClick={handlePrint}>
                            Save & Print
                        </Button>

                        <Button
                            variant="contained"
                            className="btn-design"
                            // onClick={handlePrint}
                        >
                            Save & Receipt
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default SalesInvoice;
