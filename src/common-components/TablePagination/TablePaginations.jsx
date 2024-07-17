import React from 'react';
import { TablePagination } from '@mui/material';

const TablePaginations = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default TablePaginations;
