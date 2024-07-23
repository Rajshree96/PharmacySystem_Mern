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
import PurchasePayment from "./PurchasePayment";
import axios from "axios";

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
    unitCost: "",
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
    const [ medicine, setMedicine ] = useState([]);
    const [ selectedMedicine, setSelectedMedicine ] = useState("");
    const calculateTotal = (key) => {
        return rows.reduce((sum, row) => sum + parseFloat(row[key] || 0), 0).toFixed(2);
    };
    const handleInputChange = (index, field, value) => {
        const updatedRows = [ ...rows ];
        updatedRows[index][field] = value;
        onRowChange(updatedRows);
    };

    const config = () => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
            },
        };
    };
    const fetchMedicine = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/admin/getallmedicine", config());

            if (Array.isArray(response.data.result)) {
                setMedicine(response.data.result);
            }
            else {
                console.error("Error: Fetched data is not an array");
            }
        } catch (error) {
            console.error("Error fetching medicine:", error);
            setMedicine([]);
        }
    };

    useEffect(() => {
        fetchMedicine();
    }, []);

    const handleProductChange = (event) => {
        const productId = event.target.value;
        setSelectedMedicine(productId);
        initialRow.productName = productId;
        const selectedProduct = medicine.find((product) => product._id === productId);
        initialRow.productName = selectedProduct.medicineName;
        if (selectedProduct) {
            initialRow.itemCode = selectedProduct.itemCode;
            initialRow.mrp = selectedProduct.priceDetails.mrp;
        }
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
                            Free Qty
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            MRP
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Unit Cost
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Discount1
                        </TableCell>
                        <TableCell sx={{border: "1px solid grey", width: 100, fontWeight: 700, fontSize: "15px"}}>
                            Discount2
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
                                    onChange={(e) => handleInputChange(index, "sno", e.target.value)}
                                    fullWidth
                                    size="small"
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.itemCode}
                                    fullWidth
                                    size="small"
                                    // onChange={(e) =>
                                    //   handleInputChange(index, "itemCode", e.target.value)
                                    // }
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <Select value={selectedMedicine} onChange={handleProductChange} fullWidth size="small">
                                <MenuItem value="" disabled>Select Product</MenuItem>                                
                                    {medicine.map((med) => (
                                        <MenuItem key={med._id} value={med._id}>
                                            {med.medicineName}
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
                                    value={row.freeQty}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "freeQty", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.mrp}
                                    fullWidth
                                    size="small"
                                    //  onChange={(e) =>
                                    //   handleInputChange(index, "mrp", e.target.value)
                                    // }
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.unitCost}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "unitCost", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.discount1}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "discount1", e.target.value)}
                                />
                            </TableCell>
                            <TableCell sx={{border: "1px solid grey", width: 100, height: 25}}>
                                <TextField
                                    value={row.discount2}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => handleInputChange(index, "discount2", e.target.value)}
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
                        <TableCell sx={{border: "1px solid grey", textAlign: "center"}}>-</TableCell>
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

function PurchaseInvoice({formType, selectedData, setSuccess}) {
    const breadcrumbs = [ "Purchase", "Purchase Invoice" ];
    const [ tables, setTables ] = useState([
        {
            id: Date.now(),
            rows: [ initialRow ],
        },
    ]);
    const [ otherCharges, setOtherCharges ] = useState([]);
    const [ reverseCharge, setReverseCharge ] = useState("No");
    const [ date, setDate ] = useState("");
    const [ paymentTerms, setPaymentTerms ] = useState("");
    const [ dueDate, setDueDate ] = useState("");
    const [ charges, setCharges ] = useState([]);
    const [ totalCharges, setTotalCharges ] = useState(0);
    const [ currentCharge, setCurrentCharge ] = useState("");
    const [ chargeLabel, setChargeLabel ] = useState("");
    const [ invoiceNo, setInvoiceNo ] = useState("");
    const [ supplier, setSupplier ] = useState([]);
    const [ selectedSupplier, setSelectedSupplier ] = useState("");
    const [ placeOfSupply, setPlaceOfSupply ] = useState("");
    const [ billingAddress, setBillingAddress ] = useState("");
    const [ grossAmount, setGrossAmount ] = useState("");
    const [ gstAmount, setGstAmount ] = useState("");
    const [ netAmount, setNetAmount ] = useState("");
    const [ narration, setNarration ] = useState("");
    const [ taxType, setTaxType ] = useState("");

    const [ transPortDetails, setTransPortDetails ] = useState({
        receiptNumber: "",
        dispatchedThrough: "",
        destination: "",
        carrierName: "",
        billOfLading: "",
        vehicleNumber: "",
    });

    useEffect(() => {
        if (formType === "edit purchaseinvoice" && selectedData) {
          setDate(selectedData.date)
        }
        else {
            resetForm();
        }
    }, [ formType, selectedData ]);

    const resetForm = () => {
        setDate("");
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

    const handleRowChange = (tableId, updatedRows) => {
        setTables(tables.map((table) => (table.id === tableId ? {...table, rows: updatedRows} : table)));
    };

    const resumeRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => resumeRef.current,
    });

    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const handleAddCharge = () => {
    //   const charge = parseFloat(currentCharge);
    //   if (!isNaN(charge)) {
    //     setCharges([...charges, charge]);
    //     setTotalCharges(totalCharges + charge);
    //     setCurrentCharge('');
    //   }
    //   setOpen(false);
    // };

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

    // const handleAddMedicine = () => {
    //   setTimeout(() => {
    //     setSuccess(true);
    //   }, 300);
    // };

    const purchaseData = {
        date: date,
        invoiceNo: invoiceNo,
        supplierName: selectedSupplier,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(tables);
        try {
            await addPurchase(purchaseData);
            // handleAddMedicine();
        } catch (error) {
            console.error("Error adding purchase:", error);
        }
    };

    const addPurchaseInvoice = async (purchaseData) => {
        console.log(purchaseData);
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const response = await axios.post("http://localhost:4000/api/v1/purchase/add", purchaseData, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            console.log(response);
            if (response.data.status === 201) {
                console.log("purchase created successfully ");
            }
        } catch (error) {
            console.log("something went wrong");
        }
    };

    const editPurchaseInvoice = async (id, purchaseData) => {
        console.log(purchaseData);
        try {
            const auth = JSON.parse(localStorage.getItem("auth"));
            const response = await axios.put(`http://localhost:4000/api/v1/purchase/edit/${id}`, purchaseData, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            console.log("Purchase Invoice updated:", response.data);
        } catch (error) {
            console.error("Error updating Purchase Invoice:", error);
        }
    };

    const handleSavePurchaseInvoice = async (e) => {
        e.preventDefault();
        try {
            if (formType === "edit purchaseinvoice") {
                await editPurchaseInvoice(selectedData._id, purchaseData);
                console.log("Purchase Invoice updated successfully");
            }
            else {
                await addPurchaseInvoice(purchaseData);
                console.log("Purchase Invoice added successfully");
            }
            setSuccess(true);
        } catch (error) {
            console.error(
                `Error ${formType === "edit purchaseinvoice" ? "editing" : "adding"}  purchaseinvoice:`,
                error
            );
        }
    };

    const config = () => {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json",
            },
        };
    };
    const fetchSupplier = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/admin/getAllSupplier", config());

            if (Array.isArray(response.data.result)) {
                setSupplier(response.data.result);
            }
            else {
                console.error("Error: Fetched data is not an array");
            }
        } catch (error) {
            console.error("Error fetching supplier:", error);
            setSupplier([]);
        }
    };
    useEffect(() => {
        fetchSupplier();
    }, []);

    const handleSupplierChange = (event) => {
        const supp = supplier.find((s) => s._id === event.target.value);
        setSelectedSupplier(event.target.value);
        setPlaceOfSupply(supp ? supp.address : "");
    };

    const paperStyles =
        formType === "edit purchaseinvoice"
            ? {
                  padding: 0,
                  borderRadius: 2,
                  boxShadow: "none",
                  // backgroundColor:  "#f0f4f8",
              }
            : {};

    return (
        <Container maxWidth="xl" ref={resumeRef}>
            <Paper sx={{p: 2, mb: 2, ...paperStyles}}>
                {/* Purchase Order */}
                <Box sx={{p: 2, mb: 2}}>
                    <Typography variant="h4" gutterBottom>
                        Purchase
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
                            <TextField label="Invoice No." fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Supplier Invoice No."
                                fullWidth
                                value={invoiceNo}
                                onChange={(e) => setInvoiceNo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                select
                                label="Supplier Name"
                                fullWidth
                                value={selectedSupplier}
                                onChange={handleSupplierChange}
                            >
                                {supplier.map((supp) => (
                                    <MenuItem key={supp._id} value={supp._id}>
                                        {supp.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Place of Supply" fullWidth value={placeOfSupply} />
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
                        <Grid item md={3} xs={3}>
                            <TransportDetails
                                transPortDetails={transPortDetails}
                                setTransPortDetails={setTransPortDetails}
                            />
                        </Grid>
                        <Grid item md={3} xs={3}>
                            <TextField label="Billing Address" fullWidth />
                        </Grid>
                        <Grid item md={3} xs={3}>
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
                        <Grid item md={3} xs={3}>
                            <TextField
                                select
                                label="Tax Type"
                                fullWidth
                                value={taxType}
                                onChange={(e) => setTaxType(e.target.value)}
                            >
                                <MenuItem value="TaxType1">TaxType1</MenuItem>
                                <MenuItem value="TaxType2">TaxType2</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Divider sx={{my: 2}} />

                {/* Product Details */}
                <Box sx={{p: 2}}>
                    <Typography variant="h5" gutterBottom>
                        Product Details
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

                                    {/* Display List of Charges */}
                                    <List>
                                        {charges.map((charge, index) => (
                                            <ListItem key={index}>
                                                {charge.label}: {charge.amount.toFixed(2)}
                                            </ListItem>
                                        ))}
                                    </List>
                                    {/* <TextField
                    fullWidth
                    sx={{ mt: 2 }}
                    label="Other Charges"
                    value={currentCharge}
                    onChange={(e) => setCurrentCharge(e.target.value)}
                  />
                  <Button className="btn-design" sx={{ color: 'white', mt: 2 }} onClick={handleAddCharge}>Add</Button> */}
                                </Grid>
                            </Grid>
                        </Modal>
                        <TextField label="Narration" fullWidth multiline rows={3} />
                    </Grid>
                    {/* Gross Amount */}
                    <Grid item md={8} xs={8}>
                        <Box style={{display: "grid", justifyContent: "center", gap: "15px"}}>
                            <TextField label="Gross Amount" fullWidth />
                            <TextField label="GST Amount" fullWidth />
                            <TextField
                                label="Total Charges"
                                fullWidth
                                value={`${totalCharges.toFixed(2)}`}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{mt: 2}}
                            />
                            <TextField label="Net Amount" fullWidth />
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
                            onClick={handleSavePurchaseInvoice}
                        >
                            {formType === "edit purchaseinvoice" ? "Update " : "Save "}
                        </Button>

                        <Button
                            variant="contained"
                            className="btn-design"
                            // onClick={(e) => { handleSubmit(e); handlePrint(); }}
                            onClick={(e) => {
                                handleSavePurchaseInvoice(e);
                                handlePrint();
                            }}
                        >
                            Save & Print
                        </Button>
                        <PurchasePayment
                            onClick={handleSubmit}
                            handleOpen={handleOpen}
                            netAmount={purchaseData.amounts.netAmount}
                            orderNo={purchaseData.orderNo}
                            label="Save & Payment"
                        />

                        {/* <PurchasePayment  onClick={handleSubmit} netAmount={purchaseData.amounts.netAmount} orderNo={purchaseData.orderNo} /> */}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default PurchaseInvoice;
