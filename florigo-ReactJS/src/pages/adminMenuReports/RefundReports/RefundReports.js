import Page from 'components/Page';
import OrderPreview from 'components/OrderPreview';
import Iconify from 'components/Iconify';
import { Container, Grid, IconButton, Typography, Snackbar, Alert } from '@mui/material';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import RefundReportsService from 'services/refundReportsService';
import TableCustomized from 'components/TableCustomized';
import { startOfDay, endOfDay, RangeDateInput, format } from '@components';
import { CustomButton } from 'components/CustomButtons';

import paymentService from 'services/paymentService';

import RefundModal from 'components/RefundModal';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import StatusFinder from 'components/StatusFinder';

import useIsDisabled from 'hooks/useDisabled';

i18n.addResourceBundle('en', 'refundreports', en);

export default function RefundReports() {
  const [snackBar, setSnackBar] = useState(false);
  const isDisable = useIsDisabled();
  const [selected, setSelected] = useState('cancelled,rejection,refund,chargeback,non_delivery');
  const { themeStretch } = useSettings();
  const [rows, setRows] = useState([]);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [headCells] = useState([
    {
      id: 'order_id',
      align: 'left',
      disablePadding: false,
      label: t('refundreports:headCells.order_id'),
    },
    {
      id: 'firstname',
      align: 'center',
      disablePadding: false,
      label: t('refundreports:headCells.firstname'),
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
      label: t('refundreports:headCells.lastname'),
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
      label: t('refundreports:headCells.order_tag'),
      component: (row) => <StatusFinder>{row.order_tag}</StatusFinder>,
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
      label: 'Transaction Status',
      component: (row) => <Box> {row.details?.reason}</Box>,
    },
    {
      id: 'total_price',
      align: 'center',
      disablePadding: false,
      label: 'Refund Price',
      component: (row) => (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'red' }}>
            $ {row.details.total_price}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'refund_button',
      align: 'center',
      disablePadding: false,
      label: 'Order Refund',
      component: (row) => (
        <Box>
          <CustomButton
            disabled={row.details.refunded_price || isDisable('CAN_REFUND_ORDER')}
            onClick={() => {
              setSelectedOrder(row);
              setIsOpen(true);
            }}
          >
            <Iconify icon="ri:refund-2-line"></Iconify> Refund
          </CustomButton>
        </Box>
      ),
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

  const getAllStateinfo = async () => {
    const data = await RefundReportsService.getRefundOrders(selected, starttime, endtime);
    setRows(data);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;

    getAllStateinfo();

    return () => {
      unmounted = true;
    };
  }, [starttime, endtime, selected]);

  const startRefund = async (obj) => {
    await paymentService
      .setRefund(obj)
      .then(() => {
        setSnackBar(true);
        setIsOpen(false);
      })
      .catch(() => {
        setIsOpen(false);
      });
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}></Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TableCustomized rows={rows} headCells={headCells}>
              <Box sx={{ display: 'flex', flex: 'roll', width: '100%' }}>
                <Box sx={{ flex: 1 }}></Box>
                <TextField
                  select
                  id="demo-customized-select"
                  value={selected}
                  sx={{ width: 200 }}
                  size={'small'}
                  label="Select Reason"
                  onChange={(value) => {
                    setSelected(value.target.value);
                  }}
                >
                  <MenuItem value={'cancelled,rejection,refund,chargeback,non_delivery'}>Select All</MenuItem>
                  <MenuItem value={'refund'}>Refund</MenuItem>
                  <MenuItem value={'rejection'}>Rejection</MenuItem>
                  <MenuItem value={'cancelled'}>Cancelled</MenuItem>
                  <MenuItem value={'chargeback'}>Chargeback</MenuItem>
                  <MenuItem value={'non_delivery'}>Non Delivery</MenuItem>
                </TextField>
                <RangeDateInput
                  startdate={starttime}
                  enddate={endtime}
                  hidesearch
                  setStartDate={setStarttime}
                  setEndDate={setEndtime}
                ></RangeDateInput>
              </Box>
            </TableCustomized>

            {selectedOrder && <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>}
            {selectedOrder && (
              <RefundModal
                key={new Date().getTime().toString()}
                open={isOpen}
                order={selectedOrder}
                onClose={setIsOpen}
                onSubmit={(e) => {
                  startRefund(e);
                }}
              ></RefundModal>
            )}
          </Grid>
        </Grid>
        <Snackbar
          open={snackBar}
          autoHideDuration={6000}
          onClose={() => {
            setSnackBar(false);
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => {
              setSnackBar(false);
            }}
            severity="success"
          >
            Refund/Void successfully.
          </Alert>
        </Snackbar>
      </Box>
    </Page>
  );
}
