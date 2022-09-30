import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

export default function CustomerInfoSectionFields({ customer }) {
  return (
    <TableContainer component={Box} sx={{ background: 'transparent', marginY: 1 }}>
      <Table size={'small'} sx={{ fontSize: 10 }}>
        <TableBody>
          <TableRow sx={{ border: 0.1 }}>
            <TableCell align="left">
              <strong>Billing Name: </strong> {`${customer.firstname} ${customer.lastname}`}
            </TableCell>
            <TableCell align="left">
              <strong>Phone :</strong> {customer.phone}
            </TableCell>
          </TableRow>
          <TableRow sx={{ border: 0.1 }}>
            <TableCell align="left">
              <strong>Email :</strong> {customer.email}
            </TableCell>
            <TableCell align="left">
              <strong>Address 1 :</strong>
            </TableCell>
          </TableRow>
          <TableRow sx={{ border: 0.1 }}>
            <TableCell align="left">
              <strong>City :</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Zip :</strong>
            </TableCell>
          </TableRow>
          <TableRow sx={{ border: 0.1 }}>
            <TableCell align="left">
              <strong>State :</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
