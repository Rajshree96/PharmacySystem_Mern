// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
//   FormControlLabel,
//   Checkbox,
//   Chip
// } from "@mui/material";
// import { Edit, Delete, Visibility } from "@mui/icons-material";
// import axios from "axios";
// import TablePaginations from "../TablePagination/TablePaginations";

// const AddMedicineTable = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [editingMedicine, setEditingMedicine] = useState(null);
//   const [openEditDialog, setOpenEditDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const fetchMedicines = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/v1/admin/getallmedicine");
//       console.log("API Response:", response.data.result);

//       if (Array.isArray(response.data.result)) {
//         setMedicines(response.data.result);
//       } else {
//         console.error("API response does not contain medicines array:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching medicines:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
    
//   }, [medicines]);
//  console.log(medicines);
  
//   const handleVisibilityClick = (medicine) => {
//     console.log("Viewing details for medicine:", medicine);
//   };

//   const handleEditClick = (medicine) => {
//     setEditingMedicine(medicine);
//     setOpenEditDialog(true);
//   };

//   const handleEditDialogClose = () => {
//     setOpenEditDialog(false);
//     setEditingMedicine(null);
//   };

//   const handleEditSave = async () => {
//     const auth = JSON.parse(localStorage.getItem('auth'));
//     if (!auth || !auth.token) {
//       console.error("No token found in local storage");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:4000/api/v1/admin/medicine/${editingMedicine.itemCode}`,
//         editingMedicine,
//         {
//           headers: { Authorization: `Bearer ${auth.token}` }
//         }
//       );
//       console.log("Medicine updated:", response.data);
//       setMedicines((prevMedicines) =>
//         prevMedicines.map((med) =>
//           med.itemCode === editingMedicine.itemCode ? editingMedicine : med
//         )
//       );
//       handleEditDialogClose();
//     } catch (error) {
//       console.error("Error updating medicine:", error);
//     }
//   };

//   const handleDeleteClick = async (itemCode) => {
//     const auth = JSON.parse(localStorage.getItem('auth'));
//     if (!auth || !auth.token) {
//       console.error("No token found in local storage");
//       return;
//     }

//     try {
//       const response = await axios.delete(`http://localhost:4000/api/v1/admin/delete/${itemCode}`, {
//         headers: { Authorization: `Bearer ${auth.token}` }
//       });
//       console.log("API Response:", response);

//       if (response.data.status === "ok" || response.status === 200) {
//         console.log("Deleted medicine with item code:", itemCode);
//         fetchMedicines();
//       } else {
//         console.error("Failed to delete medicine:", response.data);
//       }
//     } catch (error) {
//       console.error("Error deleting medicine:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingMedicine({ ...editingMedicine, [name]: value });
//   };

//   return (
//     <Box sx={{ overflowX: "auto" }}>
//       <TableContainer component={Paper} elevation={3}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "#004d40" }}>
//             <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sno.</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Item Code</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Medicine Name</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Batch No.</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Expiry Date</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Category</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Medicine Type</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Brand</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Unit</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Net Weight</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Array.isArray(medicines) && medicines.length > 0 ? (
//               medicines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((medicine,index) => (
//                 <TableRow key={medicine._id}>
//                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{medicine.itemCode}</TableCell>
//                   <TableCell>{medicine.medicineName}</TableCell>
//                   <TableCell>{medicine.batchNo}</TableCell>
//                   <TableCell>{medicine.expiryDate}</TableCell>
//                   <TableCell>{medicine.medicineCategory.name}</TableCell>
//                   <TableCell>{medicine.medicineType.mediType}</TableCell>
//                   <TableCell>{medicine.brand.brand}</TableCell>
//                   <TableCell>{medicine.unit.name}</TableCell>
//                   <TableCell>{medicine.netWeight}</TableCell>
//                   <TableCell>
//                     <IconButton color="success" onClick={() => handleVisibilityClick(medicine)}>
//                       <Visibility />
//                     </IconButton>
//                     <IconButton color="primary" onClick={() => handleEditClick(medicine)}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton color="error" onClick={() => handleDeleteClick(medicine.itemCode)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No medicines found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       <TablePaginations
//         count={medicines.length}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />


//       <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
//         <DialogTitle>Edit Medicine</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Edit the details of the medicine below:</DialogContentText>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 name="itemCode"
//                 label="Item Code"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.itemCode || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="medicineName"
//                 label="Medicine Name"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.medicineName || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="medicineCategory"
//                 label="Category"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.medicineCategory || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="medicineType"
//                 label="Medicine Type"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.medicineType || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="manufacturer"
//                 label="Manufacturer"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.manufacturer || ''}
//                 onChange={handleInputChange}
//                 select
//               >
//                 <MenuItem value="Manufacturer 1">Manufacturer 1</MenuItem>
//                 <MenuItem value="Manufacturer 2">Manufacturer 2</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="brand"
//                 label="Brand"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.brand || ''}
//                 onChange={handleInputChange}
//                 select
//               >
//                 <MenuItem value="Brand 1">Brand 1</MenuItem>
//                 <MenuItem value="Brand 2">Brand 2</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="unit"
//                 label="Unit"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.unit || ''}
//                 onChange={handleInputChange}
//                 select
//               >
//                 <MenuItem value="5">5</MenuItem>
//                 <MenuItem value="12">12</MenuItem>
//                 <MenuItem value="18">18</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 margin="dense"
//                 name="gstRate"
//                 label="GST Rate"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.gstRate || ''}
//                 onChange={handleInputChange}
//                 select
//               >
//                 <MenuItem value="5%">5%</MenuItem>
//                 <MenuItem value="12%">12%</MenuItem>
//                 <MenuItem value="18%">18%</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="purchaseTaxIncluded"
//                     checked={editingMedicine?.purchaseTaxIncluded || false}
//                     onChange={(e) => setEditingMedicine({ ...editingMedicine, purchaseTaxIncluded: e.target.checked })}
//                   />
//                 }
//                 label="Purchase Tax Included"
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="salesTaxIncluded"
//                     checked={editingMedicine?.salesTaxIncluded || false}
//                     onChange={(e) => setEditingMedicine({ ...editingMedicine, salesTaxIncluded: e.target.checked })}
//                   />
//                 }
//                 label="Sales Tax Included"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 name="photos"
//                 label="Product Photo"
//                 type="file"
//                 fullWidth
//                 variant="standard"
//                 inputProps={{ accept: "image/*", multiple: true }}
//                 value={editingMedicine?.photos || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 name="description"
//                 label="Description"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.description || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 name="netWeight"
//                 label="Net Weight"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.netWeight || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 name="batchNo"
//                 label="Batch No."
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.batchNo || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 name="expiryDate"
//                 label="Expiry Date"
//                 placeholder="MM/YYYY"
//                 type="month"
//                 fullWidth
//                 variant="standard"
//                 InputLabelProps={{ shrink: true }}
//                 value={editingMedicine?.expiryDate || ''}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 name="ingredients"
//                 label="Ingredients"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 multiline
//                 rows={4}
//                 value={editingMedicine?.ingredients || ''}
//                 onChange={handleInputChange}
//               />
//               <Box display="flex" flexWrap="wrap" mt={2}>
//                 {editingMedicine?.ingredientList?.map((ingredient, index) => (
//                   <Chip
//                     key={index}
//                     label={ingredient}
//                     variant="outlined"
//                     style={{ margin: '4px' }}
//                   />
//                 ))}
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <DialogContentText sx={{ fontWeight: '700', fontSize: '20px', color: '#086070' }}>Price Details</DialogContentText>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="purchasePrice"
//                 label="Purchase Price"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.purchasePrice || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, purchasePrice: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="landingCost"
//                 label="Landing Cost"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.landingCost || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, landingCost: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="mrp"
//                 label="MRP"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.mrp || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, mrp: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="retailDiscount"
//                 label="Retail Discount"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.retailDiscount || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, retailDiscount: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="retailPrice"
//                 label="Retail Price"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.retailPrice || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, retailPrice: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="retailMargin"
//                 label="Retail Margin"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.retailMargin || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, retailMargin: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="wholesalerDiscount"
//                 label="Wholesaler Discount"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.wholesalerDiscount || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, wholesalerDiscount: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="wholesalerPrice"
//                 label="Wholesaler Price"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.wholesalerPrice || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, wholesalerPrice: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="wholesaleMargin"
//                 label="Wholesale Margin"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.wholesaleMargin || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, wholesaleMargin: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 margin="dense"
//                 name="minimumStock"
//                 label="Minimum Stock"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.priceDetails?.minimumStock || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, priceDetails: { ...editingMedicine.priceDetails, minimumStock: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <DialogContentText sx={{ fontWeight: '700', fontSize: '20px', color: '#086070' }}>Opening Balance</DialogContentText>
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 margin="dense"
//                 name="openingBalance.particular"
//                 label="Opening Balance"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.openingBalance?.particular || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, openingBalance: { ...editingMedicine.openingBalance, particular: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 margin="dense"
//                 name="openingBalance.quantity"
//                 label="Quantity"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.openingBalance?.quantity || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, openingBalance: { ...editingMedicine.openingBalance, quantity: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               <TextField
//                 margin="dense"
//                 name="openingBalance.rate"
//                 label="Rate"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.openingBalance?.rate || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, openingBalance: { ...editingMedicine.openingBalance, rate: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               <TextField
//                 margin="dense"
//                 name="openingBalance.units"
//                 label="Units"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.openingBalance?.units || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, openingBalance: { ...editingMedicine.openingBalance, units: e.target.value } })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               <TextField
//                 margin="dense"
//                 name="openingBalance.amount"
//                 label="Amount"
//                 type="text"
//                 fullWidth
//                 variant="standard"
//                 value={editingMedicine?.openingBalance?.amount || ''}
//                 onChange={(e) => setEditingMedicine({ ...editingMedicine, openingBalance: { ...editingMedicine.openingBalance, amount: e.target.value } })}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AddMedicineTable;
import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllCategories, deleteCategory } from "../../categoriesApi";
import EditButton from "../ButtonContainer/EditButton";
import DeleteButton from "../ButtonContainer/DeleteButton";
import axios from "axios";

const AddMedicineTable = ({ onEditAddMedicine }) => {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/admin/getallmedicine");
      console.log("API Response:", response.data.result);

      if (Array.isArray(response.data.result)) {
        setMedicines(response.data.result);
      } else {
        console.error("API response does not contain medicines array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDeleteClick = async (itemCode) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth || !auth.token) {
      console.error("No token found in local storage");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/admin/delete/${itemCode}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log("API Response:", response);

      if (response.data.status === "ok" || response.status === 200) {
        console.log("Deleted medicine with item code:", itemCode);
        fetchMedicines();
      } else {
        console.error("Failed to delete medicine:", response.data);
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#004d40" }}>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sno.</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Item Code</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Medicine Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Batch No.</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Expiry Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Medicine Type</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Unit</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Net Weight</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(medicines) && medicines.length > 0 ? (
              medicines.map((medicine,index) => (
                <TableRow key={medicine._id}>
                 <TableCell>{index + 1}</TableCell>
                  <TableCell>{medicine.itemCode}</TableCell>
                  <TableCell>{medicine.medicineName}</TableCell>
                  <TableCell>{medicine.batchNo}</TableCell>
                  <TableCell>{medicine.expiryDate}</TableCell>
                  <TableCell>{medicine.medicineCategory.name}</TableCell>
                  <TableCell>{medicine.medicineType.mediType}</TableCell>
                  <TableCell>{medicine.brand.brand}</TableCell>
                  <TableCell>{medicine.unit.name}</TableCell>
                  <TableCell>{medicine.netWeight}</TableCell>
                  <TableCell>

                     <EditButton
                    label={"edit"}
                    icon={EditIcon}
                    sx={{ mr: 1, color: "#1976d2" }}
                    onClick={() => onEditAddMedicine(medicine)}
                  />
                  <DeleteButton
                    label={"delete"}
                    icon={DeleteIcon}
                    sx={{ mr: 1, color: "red" }}
                    onClick={() => handleDeleteClick(medicine.itemCode)}
                  />

                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No medicines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
     
    </Box>
  );
};

export default AddMedicineTable;

