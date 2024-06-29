import React from "react";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Link,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import {Add, Edit, Delete, Category} from "@mui/icons-material";

const Medicine = () => {
    return (
        <Box sx={{bgcolor: "#e0f7fa", py: 5}}>
            <Container>
                <Typography variant="h4" gutterBottom sx={{color: "#00695c", fontWeight: "bold"}}>
                    Medicine
                </Typography>
                <Paper elevation={6} sx={{p: 4}}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{mb: 3}}>
                        <Link color="inherit" href="#" sx={{textDecoration: "none", color: "#00695c"}}>
                            Medicine
                        </Link>
                    </Breadcrumbs>

                    <Grid container spacing={3} sx={{mb: 3}}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<Category />}
                                sx={{
                                    bgcolor: "#00796b",
                                    "&:hover": {bgcolor: "#004d40"},
                                    transition: "all 0.3s",
                                }}
                            >
                                Select Medicine Categories
                            </Button>
                           

                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{mb: 3}}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<Add />}
                                sx={{
                                    bgcolor: "#00796b",
                                    "&:hover": {bgcolor: "#004d40"},
                                    transition: "all 0.3s",
                                }}
                            >
                                Add Category
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<Edit />}
                                sx={{
                                    bgcolor: "#00796b",
                                    "&:hover": {bgcolor: "#004d40"},
                                    transition: "all 0.3s",
                                }}
                            >
                                Manage Category
                            </Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{bgcolor: "#004d40"}}>
                                    <TableCell sx={{color: "#fff", fontWeight: "bold"}}>S.no</TableCell>
                                    <TableCell sx={{color: "#fff", fontWeight: "bold"}}>Category Name</TableCell>
                                    <TableCell sx={{color: "#fff", fontWeight: "bold"}}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Syrup</TableCell>
                                    <TableCell>
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>Tablet</TableCell>
                                    <TableCell>
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </Box>
    );
};

export default Medicine;
