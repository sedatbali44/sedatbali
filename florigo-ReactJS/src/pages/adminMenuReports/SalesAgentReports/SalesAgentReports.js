import { useState, useEffect } from 'react';
import {
  startOfDay,
  endOfDay,
  Grid,
  Toolbar,
  Divider,
  Box,
  RangeDateInput,
  TableCustomized,
  format,
  Iconify,
  IconButton,
} from '@components';
import StatusFinder from 'components/StatusFinder';
import OrderPreview from 'components/OrderPreview';
import Page from 'components/Page';
import i18n, { t } from 'i18next';
import en from './i18n/en.json';
import SalesAgentReportsService from 'services/salesAgentReportsService';

i18n.addResourceBundle('en', 'salesagentreports', en);

const SalesAgentReports = () => {
  const [rows, setRows] = useState([]);
  const [starttime, setStarttime] = useState(startOfDay(new Date()).getTime());
  const [endtime, setEndtime] = useState(endOfDay(new Date()).getTime());
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

  const getSalesAgents = async () => {
    const data = await SalesAgentReportsService.getSalesAgentReports(starttime, endtime);
    setRows(data);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    getSalesAgents();
    return () => {
      unmounted = true;
    };
  }, [starttime, endtime]);

  return (
    <Page>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <Toolbar>
            <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <RangeDateInput
                startdate={starttime}
                enddate={endtime}
                setStartDate={setStarttime}
                setEndDate={setEndtime}
                onSubmit={() => {}}
              ></RangeDateInput>
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Divider></Divider>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <TableCustomized rows={rows} headCells={headCells}></TableCustomized>
          <OrderPreview open={open} order={selectedOrder} onClose={setOpen}></OrderPreview>
        </Grid>
      </Grid>
    </Page>
  );
};
export default SalesAgentReports;
