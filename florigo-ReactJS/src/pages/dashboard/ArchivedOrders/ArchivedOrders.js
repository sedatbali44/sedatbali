import Page from 'components/Page';
import {
  Container,
  Grid,
  TextField,
  Divider,
  Typography,
  InputAdornment,
  Card,
  CardContent,
  stateClear,
  format,
  IconButton,
  Iconify,
} from '@components';

import OrderPreview from 'components/OrderPreview';

import { MenuItem } from '@mui/material';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useSettings from 'hooks/useSettings';
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ArchivedOrderService from 'services/archivedOrdersService';
import { CustomSearchButton, CustomCancelEventButton } from 'components/CustomButtons';
import TableCustomized from 'components/TableCustomized';

import StatusFinder from 'components/StatusFinder';

i18n.addResourceBundle('en', 'archivedorders', en);

export default function ArchivedOrders() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [headCells] = useState([
    {
      id: 'order_id',
      align: 'left',
      disablePadding: false,
      label: 'Order ID',
    },
    {
      id: 'firstname',
      align: 'center',
      disablePadding: false,
      label: 'Firstname',
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <span key={i}>{item.delivery.firstname}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'lastname',
      align: 'center',
      disablePadding: false,
      label: 'Lastname',
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <span key={i}>{item.delivery.lastname}</span>
          ))}
        </Box>
      ),
    },
    {
      id: 'order_tag',
      align: 'center',
      disablePadding: false,
      label: 'Order Tag',
      component: (row) => <StatusFinder>{row.order_tag}</StatusFinder>,
    },
    {
      id: 'order_status',
      align: 'center',
      disablePadding: false,
      label: 'Order Status',
      component: (row) => <Box>{row.order_status}</Box>,
    },
    {
      id: 'order_date',
      align: 'center',
      disablePadding: false,
      label: 'Order Date',
      component: (row) => <Box> {format(new Date(row.created_at), 'MM-dd-yyyy  HH:mm a')}</Box>,
    },
    {
      id: 'sub_order',
      align: 'center',
      disablePadding: false,
      label: 'Sub Orders',
      component: (row) => <Box>{row.order_details.length}</Box>,
    },
    {
      id: 'delivery_date',
      align: 'center',
      disablePadding: false,
      label: 'Delivery Dates',
      component: (row) => (
        <Box>
          {row.order_details.map((item, i) => (
            <Box key={i}>{format(new Date(item.delivery_date * 1000), 'MM-dd-yyyy')}</Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'timezone',
      align: 'center',
      disablePadding: false,
      label: 'Order Timezone',
      component: (row) => <Box>{row.details?.customerTimezone}</Box>,
    },
    {
      id: 'city',
      align: 'center',
      disablePadding: false,
      label: 'State',
      component: (row) => <Box>{row.details?.stateshort}</Box>,
    },
    {
      id: 'reason',
      align: 'center',
      disablePadding: false,
      label: 'Refund Reason',
      component: (row) => <Box> {row.details?.reason}</Box>,
    },

    {
      id: 'show',
      align: 'right',
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

  const [search, setSearch] = useState({
    orderId: '',
    customerPhone: '',
    customerEmail: '',
    customerFirstname: '',
    customerLastname: '',
    deliveryFirstname: '',
    deliveryLastname: '',
    deliveryPhone: '',
    deliveryEmail: '',
    orderStatus: '',
    paymentCardNumber: '',
    floristName: '',
    floristPhone: '',
  });
  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);

  const getRecurringCustomers = async (obj) => {
    setLoading(true);
    await ArchivedOrderService.getOrderFromSearch(obj)
      .then((res) => {
        setRows(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setSearchValues = (key, value) => {
    const obj = {
      ...search,
      [key]: value,
    };

    setSearch(obj);
  };

  return (
    <Page loading={loading}>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Card>
          <CardContent>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sx={{ marginY: 1 }}>
                <Typography variant="h6">SEARCH FIELDS</Typography>
                <Divider sx={{ marginY: 2 }}></Divider>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.orderId}
                  onChange={(e) => setSearchValues('orderId', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  variant="outlined"
                  label="Order ID"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="carbon:user-avatar" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  value={search.customerFirstname}
                  onChange={(e) => setSearchValues('customerFirstname', e.target.value)}
                  variant="outlined"
                  label="Customer Firstname"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="carbon:user-avatar" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  variant="outlined"
                  label="Customer Lastname"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  value={search.customerLastname}
                  onChange={(e) => setSearchValues('customerLastname', e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="carbon:user-avatar" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.customerPhone}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('customerPhone', e.target.value)}
                  variant="outlined"
                  label="Customer Phone"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="bx:phone-incoming" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.customerEmail}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('customerEmail', e.target.value)}
                  variant="outlined"
                  label="Customer Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="ic:outline-mark-email-unread" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.deliveryFirstname}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('deliveryFirstname', e.target.value)}
                  variant="outlined"
                  label="Recipient Firstname"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="clarity:email-outline-alerted" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.deliveryLastname}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('deliveryLastname', e.target.value)}
                  variant="outlined"
                  label="Recipient Lastname"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="clarity:email-outline-alerted" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.deliveryEmail}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('deliveryEmail', e.target.value)}
                  variant="outlined"
                  label="Recipient Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="clarity:email-outline-alerted" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  value={search.deliveryPhone}
                  onChange={(e) => setSearchValues('deliveryPhone', e.target.value)}
                  variant="outlined"
                  label="Recipient Phone"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="bx:phone-incoming" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  fullWidth
                  variant="outlined"
                  label="Order Status"
                  select
                  value={search.orderStatus}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('orderStatus', e.target.value)}
                  sx={{ maxWidth: 247 }}
                >
                  <MenuItem value={'pendingforpayment'}>Pending for payment</MenuItem>
                  <MenuItem value={'completed'}>Completed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.floristName}
                  onChange={(e) => setSearchValues('floristName', e.target.value)}
                  variant="outlined"
                  label="Florist Name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="maki:florist" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.floristPhone}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('floristPhone', e.target.value)}
                  variant="outlined"
                  label="Florist Phone"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="map:florist" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  size={'small'}
                  value={search.paymentCardNumber}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getRecurringCustomers(search);
                  }}
                  onChange={(e) => setSearchValues('paymentCardNumber', e.target.value)}
                  variant="outlined"
                  label="Payment Card Number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Iconify icon="clarity:email-outline-alerted" sx={{ fontSize: 18 }}></Iconify>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', marginY: 2 }}>
                <CustomCancelEventButton
                  onClick={() => {
                    setSearch(stateClear(search));
                  }}
                ></CustomCancelEventButton>
                <CustomSearchButton
                  onClick={() => {
                    getRecurringCustomers(search);
                  }}
                  title="Search Order"
                ></CustomSearchButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableCustomized rows={rows} headCells={headCells}></TableCustomized>
            <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}
