import { useState } from 'react';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import TableCustomized from 'components/TableCustomized';
import { format } from 'date-fns';
import OrderPreview from 'components/OrderPreview';
import { Iconify } from '@components';
import en from './i18n/en.json';
import i18n, { t } from 'i18next';

i18n.addResourceBundle('en', 'localorders', en);

const LocalOrders = ({ orders }) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [headCells] = useState([
    {
      id: 'id',
      align: 'center',
      disablePadding: false,
      label: t('headCells.id'),
    },
    {
      id: 'order_id',
      align: 'center',
      disablePadding: false,
      label: t('headCells.orderId'),
    },
    {
      id: 'customer',
      align: 'center',
      disablePadding: false,
      label: t('headCells.customerInfo'),
      component: (row) => (
        <Box>
          <Grid container>
            <Grid item xs={12}>
              {row.customer.firstname} {row.customer.lastname}
            </Grid>
            <Grid item xs={12}>
              {row.customer.phone}
            </Grid>
            <Grid item xs={12}>
              {row.customer.email}
            </Grid>
          </Grid>
        </Box>
      ),
    },

    {
      id: 'delivery',
      align: 'center',
      disablePadding: false,
      label: t('headCells.deliveryInfo'),
      component: (row) => (
        <Box>
          <Grid container>
            {row.order_details.map((item, i) => (
              <Grid key={i} item xs={12}>
                <Box sx={{ padding: 0.1 }}>
                  <Box>{format(new Date(item?.delivery_date * 1000), 'MM-dd-yyyy h:mm a')}</Box>
                  <Box>
                    {item.delivery.firstname} {item.delivery.lastname}
                  </Box>
                  <Box>{item.delivery.email}</Box>
                  <Box>{item.delivery.phone}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
    {
      id: 'created_at',
      align: 'center',
      disablePadding: false,
      label: t('headCells.createdAt'),
      component: (row) => <Box>{format(new Date(row.created_at), 'MM-dd-yyyy h:mm a')}</Box>,
    },
    {
      id: 'price',
      align: 'center',
      disablePadding: false,
      label: t('headCells.price'),
      component: (row) => <Box>$ {row.details?.total_price}</Box>,
    },
    {
      id: 'show',
      align: 'center',
      disablePadding: false,
      label: t('headCells.preview'),
      component: (row) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelectedOrder(row);
              setOpen(true);
            }}
          >
            <Iconify icon={'bx:show-alt'}></Iconify>
          </IconButton>
        </Box>
      ),
    },
  ]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableCustomized align="left" rows={orders} headCells={headCells}>
          <Typography variant="h6">ORDERS</Typography>
        </TableCustomized>
        <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
      </Grid>
    </Grid>
  );
};

export default LocalOrders;
