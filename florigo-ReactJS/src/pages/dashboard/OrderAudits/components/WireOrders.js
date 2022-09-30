import { useState } from 'react';

import { Grid, Button, Typography } from '@mui/material';
import TableCustomized from 'components/TableCustomized';
import { format } from 'date-fns';

const WireOrders = ({ employees = [] }) => {
  const [headCells] = useState([
    {
      id: 'id', // sort edilecek satır
      align: 'left', // header ve rows için hizalama
      label: 'Actions & Flags', // Column Etiketi
      component: (
        row,
        title // Tanımlanır ise render edilir tanımlanmaz ise id karşılığı basılır.
      ) => <Button onClick={() => {}}>{row[title]}</Button>,
    },
    {
      id: 'created_at', // sort edilecek satır
      align: 'left', // header ve rows için hizalama
      label: 'Created Date', // Column Etiketi
      component: (row, title) => <div>{format(new Date(row[title]), 'MM-dd-yyyy HH:ii')}</div>,
    },
    {
      id: 'order_tag', // sort edilecek satır
      align: 'center', // header ve rows için hizalama
      label: 'Order Status', // Column Etiketi
    },
    {
      id: 'price', // sort edilecek satır
      align: 'right', // header ve rows için hizalama
      label: 'Order Status', // Column Etiketi
      component: (row) => <div>$ {row.price} </div>,
    },
  ]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableCustomized align="left" rows={employees} headCells={headCells}>
          <Typography variant="h6">WIRE ORDERS</Typography>
        </TableCustomized>
      </Grid>
    </Grid>
  );
};

export default WireOrders;
